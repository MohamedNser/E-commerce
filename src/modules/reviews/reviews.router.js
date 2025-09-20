import { Router } from "express";
import { auth } from "../../middleware/auth.js";
import endPoint from "./reviews.endPoint.js";
import * as ReviewRouter from './controller/review.js'
import { validation } from "../../middleware/validation.js";
import * as validators from "./reviews.validation.js"
const router = Router({mergeParams:true})


router.post('/',auth(endPoint.create),validation(validators.createReviewVal), ReviewRouter.createReviews )
router.get('/',auth(endPoint.all), ReviewRouter.getProductReviews )


export default router