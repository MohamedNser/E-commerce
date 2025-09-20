import { Router } from "express";
import { auth } from "../../middleware/auth.js";
import endPoint from "./cart.endPoint.js";
import * as CartRouter from "./controller/cart.js"
import { validation } from "../../middleware/validation.js";
import * as validators from "./cart.validation.js"
const router = Router()


router.post('/', auth(endPoint.add),validation(validators.addToCartVal) , CartRouter.addToCart)
router.get("/", auth(endPoint.user), CartRouter.getCart);
router.delete("/remove", auth(endPoint.user),validation(validators.removeFromCartVal), CartRouter.removeFromCart);
router.delete("/clear", auth(endPoint.user), CartRouter.clearCart);
router.put("/update", auth(endPoint.user),validation(validators.updateQuantityVal), CartRouter.updateQuantity);
export default router