
import Joi from "joi";

export const createReviewVal = {
    params: Joi.object({
        productId: Joi.string().hex().length(24).required(),
    }),
    body: Joi.object({
    message: Joi.string().min(3).required(),
    rating: Joi.number().integer().min(1).max(5).required(),
}),
};
