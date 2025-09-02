import Joi from "joi";

export const createCategoryValidation = {
    body: Joi.object({
        name: Joi.string().min(3).max(50).required().messages({
            "string.empty": "Category name is required",
            "any.required": "Category name is required",
            "string.min": "Category name must be at least 3 characters",
            "string.max": "Category name must not exceed 50 characters",
}),

}),
};

export const updateCategoryValidation = {
    body: Joi.object({
        name: Joi.string().min(3).max(50).optional(),
}),
    params: Joi.object({
        id: Joi.string().hex().length(24).required().messages({
            "string.hex": "Invalid category ID format",
        }),
}),
};
