import { Router } from "express";
import  {endPoint} from './user.endPoint.js'
import { auth } from "../../middleware/auth.js";
import userModel from "../../../DB/model/User.model.js";
import { findById } from "../../../DB/DBMethods.js";
const router = Router()


router.get('/', auth(endPoint.profile), async (req, res) => {
   // const user = await userModel.findById(req.user._id).populate("wishlist")
    const user = await findById({model:userModel ,filter:req.user._id , populate:["wishlist"] })
    return res.status(200).json({ message: `Done`, user })
})



export default router