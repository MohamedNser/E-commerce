import Joi from "joi";

export const createBrandValidation = {
    body: Joi.object({
        name: Joi.string().min(2).max(50).required().messages({
            "string.empty": "Brand name is required",
            "string.min": "Brand name must be at least 2 characters",
            "string.max": "Brand name must not exceed 50 characters",
        }),
        image: Joi.string().uri().optional().messages({
            "string.uri": "Image must be a valid URL",
        }),
    }),
};

export const updateBrandValidation = {
    body: Joi.object({
        name: Joi.string().min(2).max(50).optional(),
        image: Joi.string().uri().optional(),
    }),
    params: Joi.object({
        id: Joi.string().hex().length(24).required().messages({
            "string.hex": "Invalid Brand ID format",
        }),
    }),
};
