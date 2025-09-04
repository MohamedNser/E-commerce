import { Router } from "express";
import { auth } from "../../middleware/auth.js";
import endPoint from "./wishlist.endpoint.js";
import * as wishlistRouter from "./controller/wishlist.js"
const router = Router({mergeParams:true})


router.patch('/add',auth(endPoint.add) , wishlistRouter.addWishlist )
router.patch('/remove',auth(endPoint.remove) , wishlistRouter.RemoveWishlist )


export default router