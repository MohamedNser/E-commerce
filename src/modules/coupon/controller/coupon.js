import { create, findOne, findOneAndUpdate,findByIdAndDelete } from "../../../../DB/DBMethods.js";
import couponModel from "../../../../DB/model/coupon.model.js";
import { asyncHandler } from "../../../services/errorHandling.js";

//CreateCoupon
export const createCoupon = asyncHandler(
    async (req , res , next)=>{
        const findCoupon = await findOne({
            model:couponModel,
            filter:{name:req.body.name}
        })
    if (findCoupon) {
        return next (new Error('coupon already exist '))
    }

    req.body.createdBy = req.user._id
    const coupon = await create({
        model:couponModel,
        data:req.body
    })
    return res.status(201).json({message:'Done', coupon})
    }
)

//UpdateCoupon
export const UpdateCoupon = asyncHandler(
    async (req , res , next)=>{
        const {id} = req.params;
        req.body.updatedBy = req.body._id
        const UpdateCoupon = await findOneAndUpdate({
            model:couponModel,
            filter:{_id :id},
            data:req.body
        })
        return UpdateCoupon ? res.status(200).json({message:'Done' , UpdateCoupon}): next (new Error('cant update coupon check your :id ' , {cause:400}))

    }
)

//DeleteCoupon
export const DeleteCoupon = asyncHandler(
    async (req , res , next)=>{
        const {id} = req.params;
        const deleteCoupon = await findByIdAndDelete({
            model:couponModel,
            filter:id,
        })

        return deleteCoupon ? res.status(200).json({message:'Done' , deleteCoupon}): next (new Error('cant delete coupon ' ,{cause:400}))

    }
)