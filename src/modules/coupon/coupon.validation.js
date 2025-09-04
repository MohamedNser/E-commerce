import Joi from "joi";

//Create Coupon Validation 
export const createCouponValidation = Joi.object({
    name: Joi.string().min(2).max(50).required(),
    discount: Joi.number().min(0).max(100).required(),
    expireDate: Joi.date().required(),
    usageLimit: Joi.number().min(1).optional()
});

//Update Coupon Validation 
export const updateCouponValidation = Joi.object({
    name: Joi.string().min(2).max(50).required(),
    discount: Joi.number().min(0).max(100).optional(),
    expireDate: Joi.date().optional(),
    usageLimit: Joi.number().min(1).optional()
});

// Delete Coupon Validation 
export const deleteCouponValidation = Joi.object({
    id: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required() // Mongo ObjectId
});
