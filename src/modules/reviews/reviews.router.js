import { Router } from "express";
import { auth } from "../../middleware/auth.js";
import endPoint from "./reviews.endPoint.js";
import * as ReviewRouter from './controller/review.js'
const router = Router({mergeParams:true})


router.post('/',auth(endPoint.create), ReviewRouter.createReviews )


export default router