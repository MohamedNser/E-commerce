import userModel from "../../../../DB/model/User.model.js";
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'
import { sendEmail } from "../../../services/email.js";

//signup 
export const signup = async(req,res)=>{
  try {
    const {userName , email , password} = req.body;
  const user = await userModel.findOne({email}).select('email')
  if (user) {
    res.status(409).json({message:'email exist'})
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
      res.status(400).json({message:'rejected email'})
    }
  }
  } catch (error) {
    res.status(500).json({message:'catch error' , error})
    console.log(error);
    
    
  }
  
}

//confirmEmail 
export const confirmEmail = async(req,res)=>{
  try {
    const {token} = req.params;
    const decoded = jwt.verify(token , process.env.tokenSignature)
  if (!decoded?.id) {
    res.status(400).json({message:'in-valid decoded token'})
  } else {
    const user = await userModel.findOneAndUpdate({_id: decoded.id , confirmEmail:false},{confirmEmail:true})
    res.status(200).redirect(process.env.LINK)
            
  }
  } catch (error) {
    res.status(500).json({message:'catch error' , error})
    console.log(error);
    
    
  }
  
}

//signin 
export const signin = async(req,res)=>{
try {
  const {email , password} = req.body;
  const user = await userModel.findOne({email})
  if (!user) {
    res.status(400).json({message:'email not exist'})
  } else {
    if (!user.confirmEmail) {
      res.status(400).json({message:'email not confirm yet'})
    } else {
    if (user.blocked) {
        res.status(400).json({message:'email blocked'})
      } else {
        const match = bcrypt.compareSync(password ,user.password)
      if (!match) {
          res.status(400).json({message:'password not match'})
        } else {
            const token = jwt.sign({id: user._id} , process.env.tokenSignature , {expiresIn:60*60*24})
            res.status(200).json({message:'Done' , token})
        }
      }
    }
  }
} catch (error) {
    res.status(500).json({message:'catch error' , error})
    console.log(error);
}
  
}