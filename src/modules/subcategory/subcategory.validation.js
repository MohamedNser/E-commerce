import Joi from "joi";

// export const createSubCategoryValidation = {
//     body: Joi.object({
//         name: Joi.string().min(3).max(50).required().messages({
//             "string.empty": "SubCategory name is required",
//             "string.min": "SubCategory name must be at least 3 characters",
//             "string.max": "SubCategory name must not exceed 50 characters",
//         }),
//         categoryId: Joi.string().hex().length(24).required().messages({
//             "string.empty": "Category ID is required",
//             "string.hex": "Invalid Category ID format",
//         }),
//     }),
// };
export const createSubCategoryValidation = {
    body: Joi.object({
        name: Joi.string().min(3).max(50).required().messages({
            "string.empty": "Subcategory name is required",
            "string.min": "Subcategory name must be at least 3 characters",
            "string.max": "Subcategory name must not exceed 50 characters",
    }),
}),
};


export const updateSubCategoryValidation = {
    body: Joi.object({
        name: Joi.string().min(3).max(50).optional(),
        categoryId: Joi.string().hex().length(24).optional(),
    }),
};
