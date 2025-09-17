import { create, findOne } from "../../../../DB/DBMethods.js";
import orderModel from "../../../../DB/model/order.model.js";
import reviewModel from "../../../../DB/model/review.model.js";
import { asyncHandler } from "../../../services/errorHandling.js";


export const createReviews = asyncHandler(async(req,res,next)=>{
    const {productId}  = req.params;
    const {_id} = req.user;
    const {message , rating} = req.body;

    const checkReview = await findOne({
        model:reviewModel,
        filter:{
            productId,
            userId:_id
        }
    })
    if (checkReview) {
        return next(new Error ("You have already submitted a review for this product.", { cause: 409 }))
    }

    const checkOrder = await findOne ({
        model:orderModel,
        filter:{
            userId:_id,
            "products.productId" : productId,
            status: "received"
        }
    })
    if (!checkOrder) {
        return next(new Error ("You cannot review this product because no order was found associated with your account.", { cause: 400}))
    }

    const review = await create({
        model: reviewModel,
        data:{
            userId:_id,
            productId,
            message,
            rating
        }
    })
    return res.status(200).json({message: "Done", review})

}) 
