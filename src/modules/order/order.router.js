import { Router } from "express";
import { auth } from "../../middleware/auth.js";
import endPoint from "./order.endPoint.js";
import * as orderRouter from "./controller/order.js"
import { validation } from "../../middleware/validation.js";
import * as validators from "./order.validation.js"
const router = Router()


router.post('/',auth(endPoint.add),validation(validators.AddOrder) , orderRouter.addOrder )
router.get('/',auth(endPoint.user) , orderRouter.getUserOrders )
router.get('/:orderId', auth(endPoint.user), orderRouter.getSingleOrder);
router.put('/:orderId/status', auth(endPoint.admin),validation(validators.updateOrderStatusVal), orderRouter.updateOrderStatus);
router.put('/:orderId/cancel', auth(endPoint.user), orderRouter.cancelOrder);





export default router