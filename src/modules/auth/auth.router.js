import { Router } from "express";
const router = Router()
import * as registerController from './controller/registration.js'

//signup & confirmEmail
router.post('/signup' , registerController.signup)
router.get('/confirmEmail/:token' , registerController.confirmEmail)
//signin
router.post('/signin' , registerController.signin)


export default router