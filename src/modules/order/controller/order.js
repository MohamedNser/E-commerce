import { findByIdAndUpdate, findOne , create} from "../../../../DB/DBMethods.js";
import couponModel from "../../../../DB/model/coupon.model.js";
import productModel from "../../../../DB/model/Product.model.js";
import { asyncHandler } from "../../../services/errorHandling.js";
import orderModel from "../../../../DB/model/order.model.js";



export const addOrder = asyncHandler(async(req,res,next)=>{
    const {_id} =req.user
    const finalList = []
    const {products ,couponId} = req.body;
    let sumTotal = 0; 
    for (let i = 0; i < products.length; i++) {
        const checkItem = await findOne({
            model: productModel,
            filter:{_id: products[i].productId , stock:{$gte:products[i].quantity}}
        })
        if (!checkItem) {
            return next(new Error("product not found or insufficient stock" , {cause:409}))
        }
        products[i].unitPrice = checkItem.finalPrice
        products[i].totalPrice =( checkItem.finalPrice * products[i].quantity)
        sumTotal +=  products[i].totalPrice
        finalList.push(products[i])
    }
    req.body.sumTotal = sumTotal 
    req.body.totalPrice = sumTotal 
    
    if (couponId) {
        const checkCoupon = await findOne({
            model:couponModel,
            filter:{_id:couponId ,usedBy:{$nin:_id} }
        })
        if (!checkCoupon) {
            return next(new Error("in-valid coupon" , {cause:409}))
        }
        req.body.totalPrice = sumTotal - (sumTotal * (checkCoupon.amount / 100))
    }
    req.body.userId = _id
    req.body.products = finalList
    const order = await create({
        model:orderModel,
        data:req.body
    })

    if (order) {
        if (couponId) {
            await findByIdAndUpdate({
                model:couponModel,
                filter:couponId,
                data:{$addToSet:{usedBy:_id}}
            })
        
        }
        return res.status(200).json({message:'Done' , order})
    } else {
        return next(new Error("fail to placed order" , {cause:409}))
    }
})