import { Router } from "express";
import { endPoint } from "./coupon.endPoint.js";
import { auth } from "../../middleware/auth.js";
import * as CouponRouter from "./controller/coupon.js"
import {validation} from '../../middleware/validation.js'
import * as validators from "./coupon.validation.js"
const router = Router()


router.post('/',auth(endPoint.createCoupon) ,validation(validators.createCouponValidation) ,CouponRouter.createCoupon )
router.put('/:id',auth(endPoint.updateCoupon),validation(validators.updateCouponValidation) ,CouponRouter.UpdateCoupon )
router.delete('/:id',auth(endPoint.deleteCoupon),validation(validators.deleteCouponValidation) ,CouponRouter.DeleteCoupon )


export default router