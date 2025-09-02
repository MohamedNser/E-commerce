import Joi from 'joi'

export const createProductValidation = {
    body: Joi.object({
        name: Joi.string().min(3).max(30).required().messages({
            "string.empty": "Product name is required",
            "string.min": "Product name must be at least 3 characters",
            "string.max": "Product name must not exceed 30 characters",
        }),
        
        description: Joi.string().min(10).max(500).optional().messages({
            "string.min": "Description must be at least 10 characters",
            "string.max": "Description must not exceed 500 characters",
        }),
        
        amount: Joi.number().integer().min(0).required().messages({
            "number.base": "Amount must be a number",
            "number.integer": "Amount must be an integer",
            "number.min": "Amount cannot be negative",
        }),
        
        price: Joi.number().positive().required().messages({
            "number.base": "Price must be a number",
            "number.positive": "Price must be greater than 0",
        }),
        
        discount: Joi.number().min(0).max(99).optional().messages({
            "number.base": "Discount must be a number",
            "number.min": "Discount cannot be negative",
            "number.max": "Discount cannot exceed 99%",
        }),
        
        categoryId: Joi.string().hex().length(24).required().messages({
            "string.empty": "Category ID is required",
            "string.hex": "Invalid category ID format",
            "string.length": "Category ID must be 24 characters",
        }),
        colors: Joi.array().items(Joi.string()).optional().messages({
            "array.base": "Colors must be an array",
        }),
        
        size: Joi.alternatives().try(
            Joi.array().items(Joi.string()),
            Joi.string()
        ).optional().messages({
            "alternatives.types": "Size must be a string or array of strings",
        }),
        
        subcategoryId: Joi.string().hex().length(24).optional().messages({
            "string.hex": "Invalid subcategory ID format",
            "string.length": "Subcategory ID must be 24 characters",
        }),
        
        brandId: Joi.string().hex().length(24).optional().messages({
            "string.hex": "Invalid brand ID format",
            "string.length": "Brand ID must be 24 characters",
        }),
    }),
};

//updateProduct 



export const updateProductValidation = {
    body: Joi.object({
        name: Joi.string().min(2).max(100).optional(),
        amount: Joi.number().integer().min(0).optional(),
        price: Joi.number().positive().optional(),
        discount: Joi.number().min(0).max(100).optional(),
        subcategoryId: Joi.string().hex().length(24).optional(), 
        categoryId: Joi.string().hex().length(24).optional(),
        brandId: Joi.string().hex().length(24).optional(),
        colors: Joi.array().items(Joi.string()).optional(),  
        size: Joi.array().items(Joi.string().valid("XS", "S", "M", "L", "XL", "XXL")).optional()
  
        
}).or(
    "name",
    "amount",
    "price",
    "discount",
    "subcategoryId",
    "categoryId",
    "brandId"
) 
};


export const getProductByIdValidation = {
  params: Joi.object({
    id: Joi.string().hex().length(24).required()
  })
};