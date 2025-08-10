import { Router } from "express";
const router = Router()
import * as validators from "./auth.validation.js"
import * as registerController from './controller/registration.js'
import { validation } from "../../middleware/validation.js";
import { auth } from "../../middleware/auth.js";
import { endPoint } from "../user/user.endPoint.js";

//signup & confirmEmail
router.post('/signup' ,validation(validators.signup) ,registerController.signup)
router.get('/confirmEmail/:token' ,validation(validators.token), registerController.confirmEmail)
//signin
router.post('/signin' ,validation(validators.login), registerController.signin)
//updatePassword
router.patch('/password' ,auth(endPoint.profile) , registerController.updatePassword )
//sendCode
router.patch('/code' , registerController.sendCode)
//forgetPassword
router.patch('/forgetPassword' , registerController.forgetPassword)
//refreshToken
router.get('/refreshToken/:token' , registerController.refreshToken)
export default router