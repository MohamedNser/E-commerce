import userModel from "../../../../DB/model/User.model.js";
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'
import { sendEmail } from "../../../services/email.js";
import { asyncHandler } from "../../../services/errorHandling.js";

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
    const link = `${req.protocol}://${req.headers.host}${process.env.BASEURL}/auth/confirmEmail/${token}`
            
        const info = await  sendEmail(email , 'confirmationEmail' , ` <div style="font-family: Arial, sans-serif;">
        <h2>verify Email</h2>
        <p>confirmation Email</p>
        <a href="${link}" style="background-color: blue; color: white; padding: 10px 20px; 
        text-decoration: none; border-radius: 5px;">click here to confirm your Email</a> 
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
export const confirmEmail =asyncHandler(async(req,res)=>{

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
export const signin = asyncHandler(async(req,res)=>{
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
            const token = jwt.sign({id: user._id} , process.env.tokenSignature , {expiresIn:60*60*24})
            res.status(200).json({message:'Done' , token})
        }
      }
    }
  }

  
}) 