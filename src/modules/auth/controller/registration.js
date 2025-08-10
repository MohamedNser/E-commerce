import userModel from "../../../../DB/model/User.model.js";
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'
import { sendEmail } from "../../../services/email.js";
import { asyncHandler } from "../../../services/errorHandling.js";
import { findById, findOne, findOneAndUpdate, updateOne } from "../../../../DB/DBMethods.js";
import { nanoid } from "nanoid";

//signup 
export const signup =asyncHandler(async(req,res,next)=>{
    const {userName , email , password} = req.body;
  //const user = await userModel.findOne({email}).select('email')
  const user = await findOne({ model: userModel,filter: { email },select: "email",
  });
  if (user) {
    next(new Error ('email exist' , {cause:409}))
  } else {
    const hash = bcrypt.hashSync(password , parseInt(process.env.SALTROUND))
    const newUser = await userModel({email , userName ,password:hash})
    console.log(newUser);
    const token = jwt.sign({id: newUser._id} ,process.env.tokenSignature, {expiresIn:'2h'})
    const refreshToken = jwt.sign({id: newUser._id} ,process.env.tokenSignature)
    const link = `${req.protocol}://${req.headers.host}${process.env.BASEURL}/auth/confirmEmail/${token}`
    const refreshLink = `${req.protocol}://${req.headers.host}${process.env.BASEURL}/auth/refreshtoken/${refreshToken}`
            
        const info = await  sendEmail(email , 'confirmationEmail' , ` <div style="font-family: Arial, sans-serif;">
        <h2>verify Email</h2>
        <p>confirmation Email</p>
        <a href="${link}" style="background-color: blue; color: white; padding: 10px 20px; 
        text-decoration: none; border-radius: 5px;">click here to confirm your Email</a> 
        <br>
        <br>
        <a href="${refreshLink}" style="background-color: blue; color: white; padding: 10px 20px; 
        text-decoration: none; border-radius: 5px;">Token expired. Refresh required</a> 
    </div>`)
    console.log('Email sending info:', info);
    if (info?.accepted?.length) {
      const savedUser =await newUser.save()
      res.status(201).json({message:'Done' , savedUserId: savedUser._id})
    } else {
      next(new Error ('rejected email' , {cause:400}))
    }
  }
  }) 

//confirmEmail 
export const confirmEmail =asyncHandler(async(req,res,next)=>{

    const {token} = req.params;
    const decoded = jwt.verify(token , process.env.tokenSignature)
  if (!decoded?.id) {
    next(new Error('in-valid decoded token' , {cause:400}))
  } else {
   // const user = await userModel.findOneAndUpdate({_id: decoded.id , confirmEmail:false},{confirmEmail:true})
    const user = await findOneAndUpdate({model: userModel, filter: { _id: decoded.id, confirmEmail: false },
      data: { confirmEmail: true },
      options: { new: true },
    });
    res.status(200).redirect(process.env.LINK)
            
  }
  })  

//signin 
export const signin = asyncHandler(async(req,res,next)=>{
  const {email , password} = req.body;
  //const user = await userModel.findOne({email})
  const user = await findOne({ model: userModel, filter: { email } });
  if (!user) {
    next(new Error('email not exist' , {cause:400}))
  } else {
    if (!user.confirmEmail) {
      next(new Error('email not confirm yet' , {cause:400}))
    } else {
    if (user.blocked) {
          next(new Error('email blocked' , {cause:400}))

      } else {
        const match = bcrypt.compareSync(password ,user.password)
      if (!match) {
            next(new Error('password not match' , {cause:400}))
        } else {
            const token = jwt.sign({id: user._id ,isLoggedIn:true} , process.env.tokenSignature , {expiresIn:60*60*24})
            res.status(200).json({message:'Done' , token})
        }
      }
    }
  }

  
}) 

//updatePassword
export const updatePassword = asyncHandler(async (req, res, next) => {
  const { oldPassword, NewPassword } = req.body;
  const user = await findById({ model: userModel, filter: req.user._id });
  
  const match = bcrypt.compareSync(oldPassword, user.password);
  if (!match) {
    next(new Error('in-valid old password', { cause: 400 }));
  }
  
  const NewHash = bcrypt.hashSync(NewPassword, parseInt(process.env.SALTROUND));
  const updateUser = await updateOne(userModel, { _id: user._id }, { password: NewHash });
  
  if (updateUser.modifiedCount) {
    res.status(200).json({ message: 'DONE' });
  } else {
    next(new Error('failed update password', { cause: 400 }));
  }
});

//sendCode
export const sendCode = asyncHandler(async(req,res,next)=>{
  const {email} = req.body;
  const user = await findOne({model:userModel , filter:{email} , select:'email'})
  if (!user) {
    next(new Error("in-valid account" , {cause:404}))
  } else {
    const code = nanoid()
    sendEmail(email ,'forget password' , `<h1>access code: <h3>${code}</h3> </h1>`)
    const UpdateUser = await updateOne({model:userModel , filter:{_id:user._id},data:{code}})
    UpdateUser.modifiedCount ? res.status(201).json({message:"Done"}) : next(new Error('fail'))
  }
})

//forgetPassword
export const forgetPassword = asyncHandler(async(req,res,next)=>{
  const {code , NewPassword , email} = req.body;
  if (code == null) {
    next(new Error("in-valid code null not accepted"))
  } else {
    const hashPassword = bcrypt.hashSync(NewPassword , parseInt(process.env.SALTROUND))
    const user = await updateOne({model:userModel , filter:{email , code} , data:{password:hashPassword , code: null}})
    user.modifiedCount ? res.status(200).json({message:'Done'}) : next(new Error("in-valid code"))
  }
  
})

//refreshToken 
export const refreshToken = asyncHandler(async(req,res,next)=>{ 
  const {token} =req.params;
  const decoded = jwt.verify(token , process.env.tokenSignature)
  if (!decoded?.id) {
    next(new Error("invalid token payload"))
  } else {
    const user = await findById({model:userModel , filter:decoded.id ,select:"email confirmEmail" })
    if (!user) {
      next(new Error("account not register"))
    } else {
      if (user.confirmEmail) {
        res.status(200).json({message: "already confirmed"})
      } else {
        const token = jwt.sign({id: user._id} ,process.env.tokenSignature, {expiresIn:'1h'})
        const link = `${req.protocol}://${req.headers.host}${process.env.BASEURL}/auth/confirmEmail/${token}`
        sendEmail(user.email , 'confirmationEmail' , ` <div style="font-family: Arial, sans-serif;">
        <h2>verify Email</h2>
        <p>confirmation Email</p>
        <a href="${link}" style="background-color: blue; color: white; padding: 10px 20px; 
        text-decoration: none; border-radius: 5px;">click here to confirm your Email</a> 
    </div>`)
    res.status(200).redirect(process.env.LINK)
      }
    }
  }
  
})