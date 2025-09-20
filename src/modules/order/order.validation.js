import Joi from "joi";

//AddOrder
export const AddOrder = {
    body: Joi.object({
        products: Joi.array().items(
            Joi.object({
                productId: Joi.string().hex().length(24).required(),
                quantity: Joi.number().min(1).required(),
            })
        ).required(),
        address: Joi.string().min(3).required(),
        phone: Joi.string().pattern(/^01[0-2,5]{1}[0-9]{8}$/).required(),
        paymentType: Joi.string().valid('Cash', 'card').default('Cash'),
        couponId: Joi.string().hex().length(24).optional(),
    }),
};

//Update Order Status (Admin)
export const updateOrderStatusVal = {
    params: Joi.object({
        orderId: Joi.string().hex().length(24).required(),}),
        body: Joi.object({
            status: Joi.string().valid("placed", "received", "rejected", "onWay").required(),
        }),
};