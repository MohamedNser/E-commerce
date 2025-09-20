import Joi from "joi";

// Add product to cart
export const addToCartVal = {
    body: Joi.object({
        products: Joi.array().items(
        Joi.object({
            productId: Joi.string().hex().length(24).required(),
            quantity: Joi.number().integer().min(1).required(),
        })
    )
    .min(1)
    .required(),
}),
};

// Remove product from cart
export const removeFromCartVal = {
    body: Joi.object({
        productId: Joi.string().hex().length(24).required(),
    }),
};

// Update quantity of a product
export const updateQuantityVal = {
    body: Joi.object({
        productId: Joi.string().hex().length(24).required(),
        quantity: Joi.number().integer().min(1).required(),
    }),
};
