import { Router } from "express";
import { auth } from "../../middleware/auth.js";
import endPoint from "./cart.endPoint.js";
import * as CartRouter from "./controller/cart.js"
const router = Router()


router.post('/', auth(endPoint.add) , CartRouter.addToCart)


export default router