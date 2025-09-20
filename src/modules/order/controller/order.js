import { findByIdAndUpdate, findOne , create,find} from "../../../../DB/DBMethods.js";
import couponModel from "../../../../DB/model/coupon.model.js";
import productModel from "../../../../DB/model/Product.model.js";
import { asyncHandler } from "../../../services/errorHandling.js";
import orderModel from "../../../../DB/model/order.model.js";
import { payment } from "../../../services/payment.js";
import Stripe from "stripe";



// export const addOrder = asyncHandler(async(req,res,next)=>{
//     const {_id} =req.user
//     const finalList = []
//     const {products ,couponId} = req.body;
//     let sumTotal = 0; 
//     for (let i = 0; i < products.length; i++) {
//         const checkItem = await findOne({
//             model: productModel,
//             filter:{_id: products[i].productId , stock:{$gte:products[i].quantity}}
//         })
//         if (!checkItem) {
//             return next(new Error("product not found or insufficient stock" , {cause:409}))
//         }
//         products[i].unitPrice = checkItem.finalPrice
//         products[i].totalPrice =( checkItem.finalPrice * products[i].quantity)
//         sumTotal +=  products[i].totalPrice
//         finalList.push(products[i])
//     }
//     req.body.sumTotal = sumTotal 
//     req.body.totalPrice = sumTotal 
    
//     if (couponId) {
//         const checkCoupon = await findOne({
//             model:couponModel,
//             filter:{_id:couponId ,usedBy:{$nin:_id} }
//         })
//         if (!checkCoupon) {
//             return next(new Error("in-valid coupon" , {cause:409}))
//         }
//         req.body.totalPrice = sumTotal - (sumTotal * (checkCoupon.amount / 100))
//     }
//     req.body.userId = _id
//     req.body.products = finalList
//     const order = await create({
//         model:orderModel,
//         data:req.body
//     })

//     if (order) {
//         if (couponId) {
//             await findByIdAndUpdate({
//                 model:couponModel,
//                 filter:couponId,
//                 data:{$addToSet:{usedBy:_id}}
//             })
        
//         }

        
//         if (order.paymentType=='card') {
//         const stripe = new Stripe(process.env.STRIPE_KEY)
//         const session= await payment({
//             stripe,
//             payment_method_types:['card'],
//             mode:'payment',
//             customer_email:req.user.email,
//             metadata:{
//                 orderId:order._id.toString()
//             },
//             cancel_url:`${process.env.CANCEL_URL}?orderId=${order._id.toString()}`,
//             line_items:order.products.map(product=>{
//                 return{
//                     price_data:{
//                         currency:'usd',
//                         product_data:{
//                             name:product.name
//                         },
//                         unit_amount:product.unitPrice*100
//                     },
//                     quantity:product.quantity
//                 }
                
//             })
            
//         })
//         return res.status(200).json({message:'Done' })
//     } 
    
//         return res.status(200).json({message:'Done' , order})
//     } else {
//         return next(new Error("fail to placed order" , {cause:409}))
//     }
    

    

// })





//getUserOrders

// export const addOrder = asyncHandler(async (req, res, next) => {
//     console.log('SUCCESS_URL:', process.env.SUCCESS_URL);
// console.log('CANCEL_URL:', process.env.CANCEL_URL);
//     const { _id } = req.user;
//     const finalList = [];
//     const { products, couponId } = req.body;
//     let sumTotal = 0;
    

//     for (let i = 0; i < products.length; i++) {
//         const checkItem = await findOne({
//             model: productModel,
//             filter: { _id: products[i].productId, stock: { $gte: products[i].quantity } }
//         });
//         if (!checkItem) {
//             return next(new Error("Product not found or insufficient stock", { cause: 409 }));
//         }
//         products[i].unitPrice = checkItem.finalPrice;
//         products[i].totalPrice = checkItem.finalPrice * products[i].quantity;
//         products[i].name = checkItem.name; // أضف اسم المنتج للاستخدام في Stripe
//         sumTotal += products[i].totalPrice;
//         finalList.push(products[i]);
//     }
    
//     req.body.sumTotal = sumTotal;
//     req.body.totalPrice = sumTotal;
    
//     if (couponId) {
//         const checkCoupon = await findOne({
//             model: couponModel,
//             filter: { _id: couponId, usedBy: { $nin: _id } }
//         });
//         if (!checkCoupon) {
//             return next(new Error("Invalid coupon", { cause: 409 }));
//         }
//         req.body.totalPrice = sumTotal - (sumTotal * (checkCoupon.amount / 100));
//     }
    
//     req.body.userId = _id;
//     req.body.products = finalList;
    

//     const order = await create({
//         model: orderModel,
//         data: req.body
//     });
    
//     if (!order) {
//         return next(new Error("Failed to place order", { cause: 409 }));
//     }
    
//     if (couponId) {
//         await findByIdAndUpdate({
//             model: couponModel,
//             filter: couponId,
//             data: { $addToSet: { usedBy: _id } }
//         });
//     }
    
//     if (order.paymentType === 'card') {
//         const stripe = new Stripe(process.env.STRIPE_KEY);
        
//         const session = await payment({
//             stripe,
//             payment_method_types: ['card'],
//             mode: 'payment',
//             customer_email: req.user.email,
//             metadata: { orderId: order._id.toString() },
//             success_url: `${process.env.SUCCESS_URL}?orderId=${order._id.toString()}`,
//             cancel_url: `${process.env.CANCEL_URL}?orderId=${order._id.toString()}`,
//             line_items: order.products.map(product => ({
//                 price_data: {
//                     currency: 'usd',
//                     product_data: { 
//                         name: product.name || 'Product' 
//                     },
//                     unit_amount: Math.round(product.unitPrice * 100) 
//                 },
//                 quantity: product.quantity
//             }))
//         });
        
//         return res.status(200).json({
//             message: 'Payment session created successfully',
//             paymentSession: session,
//             success_url: `${process.env.SUCCESS_URL}?orderId=${order._id.toString()}`,
//             cancel_url: `${process.env.CANCEL_URL}?orderId=${order._id.toString()}`
//         });
//     }
    
    
//     return res.status(200).json({ message: 'Order placed successfully', order });
// });

export const addOrder = asyncHandler(async (req, res, next) => {
    const { _id } = req.user;
    const finalList = [];
    const { products, couponId } = req.body;
    let sumTotal = 0;

    for (let i = 0; i < products.length; i++) {
        const checkItem = await findOne({
            model: productModel,
            filter: { _id: products[i].productId, stock: { $gte: products[i].quantity } }
        });
        if (!checkItem) {
            return next(new Error("Product not found or insufficient stock", { cause: 409 }));
        }
        products[i].unitPrice = checkItem.finalPrice;
        products[i].totalPrice = checkItem.finalPrice * products[i].quantity;
        products[i].name = checkItem.name;
        sumTotal += products[i].totalPrice;
        finalList.push(products[i]);
    }

    req.body.sumTotal = sumTotal;
    req.body.totalPrice = sumTotal;

    if (couponId) {
        const checkCoupon = await findOne({
            model: couponModel,
            filter: { _id: couponId, usedBy: { $nin: _id } }
        });
        if (!checkCoupon) {
            return next(new Error("Invalid coupon", { cause: 409 }));
        }
        req.body.totalPrice = sumTotal - (sumTotal * (checkCoupon.amount / 100));
    }

    req.body.userId = _id;
    req.body.products = finalList;

    const order = await create({
        model: orderModel,
        data: req.body
    });

    if (!order) {
        return next(new Error("Failed to place order", { cause: 409 }));
    }

    if (couponId) {
        await findByIdAndUpdate({
            model: couponModel,
            filter: couponId,
            data: { $addToSet: { usedBy: _id } }
        });
    }

    if (order.paymentType === 'card') {
        const stripe = new Stripe(process.env.STRIPE_KEY);
        
    
        const finalTotalPrice = order.totalPrice;
        const originalTotalPrice = order.sumTotal;
        const discountRatio = finalTotalPrice / originalTotalPrice;

        const session = await payment({
            stripe,
            payment_method_types: ['card'],
            mode: 'payment',
            customer_email: req.user.email,
            metadata: { orderId: order._id.toString() },
            success_url: `${process.env.SUCCESS_URL}?orderId=${order._id.toString()}`,
            cancel_url: `${process.env.CANCEL_URL}?orderId=${order._id.toString()}`,
            line_items: order.products.map(product => ({
                price_data: {
                    currency: 'usd',
                    product_data: { name: product.name || 'Product' },
                    // تطبيق نفس نسبة الخصم على كل منتج
                    unit_amount: Math.round((product.unitPrice * discountRatio) * 100)
                },
                quantity: product.quantity
            }))
        });

        return res.status(200).json({
            message: 'Payment session created successfully',
            paymentSession: session,
            checkout_url: session.url
        });
    }

    return res.status(200).json({ message: 'Order placed successfully', order });
});


export const getUserOrders = asyncHandler(async (req, res, next) => {
    const { _id } = req.user;
    const orders = await find({
        model: orderModel,
        filter: { userId: _id },
        populate: [
            { path: "products.productId", select: "name finalPrice" }
        ]
    });
    return res.status(200).json({ message: "Your orders", orders });
});

//getSingleOrder
export const getSingleOrder = asyncHandler(async (req, res, next) => {
    const { _id } = req.user;
    const { orderId } = req.params;

    const order = await findOne({
        model: orderModel,
        filter: { _id: orderId, userId: _id },
        populate: [
            {
                path: "products.productId",
                select: "name finalPrice"
            }
        ]
    });
    if (!order) {
        return next(new Error("Order not found", { cause: 404 }));
    }
    return res.status(200).json({ message: "Order details", order });
});

//updateOrderStatus
export const updateOrderStatus = asyncHandler(async (req, res, next) => {
    const { orderId } = req.params;
    const { status } = req.body;

    const order = await findByIdAndUpdate({
        model: orderModel,
        filter: orderId,
        data: { status },
        options: { new: true }
    });

    if (!order) {
        return next(new Error("Order not found", { cause: 404 }));
    }

    return res.status(200).json({ message: "Order status updated", order });
});

//cancelOrder
export const cancelOrder = asyncHandler(async (req, res, next) => {
    const { _id } = req.user;
    const { orderId } = req.params;

    const order = await findOne({
        model: orderModel,
        filter: { _id: orderId, userId: _id }
    });

    if (!order) {
        return next(new Error("Order not found", { cause: 404 }))
    }

    if (order.status === "received" || order.status === "rejected") {
        return next(new Error("Order cannot be cancelled", { cause: 400 }));
    }

    const cancelledOrder = await findByIdAndUpdate({
        model: orderModel,
        filter: orderId,
        data: { status: "rejected" },
        options: { new: true }
    });

    return res.status(200).json({ message: "Order cancelled", order: cancelledOrder });
});
