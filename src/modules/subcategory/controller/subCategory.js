import { create, find, findById, findByIdAndUpdate, findOneAndUpdate } from "../../../../DB/DBMethods.js";
import { asyncHandler } from "../../../services/errorHandling.js";
import cloudinary from "../../../services/cloudinary.js"
import slugify from'slugify'
import categoryModel from "../../../../DB/model/Category.model.js";
import { paginate } from "../../../services/pagination.js";
import subcategoryModel from "../../../../DB/model/Subcategory.model.js";

// //cerateCategory
export const cerateSubCategory =asyncHandler(
    async(req,res,next)=>{
        if (!req.file) {
            return next (new Error("image must be required" , {cause:400}))
        } else {
            const {categoryId}=req.params;
            const category = await findById({
                model:categoryModel,
                filter:categoryId})
            if (!category) {
                next (new Error("invalid parent category ID" , {cause:400}))
            } else {
                const {name} = req.body;
            const {secure_url , public_id} = await cloudinary.uploader.upload(req.file.path, {folder:`E-commerceProject/category/${category._id}`}) 
            const subcategory = await create(
                {model:subcategoryModel , 
                data:{name,
                    slug:slugify(name)
                    ,image:secure_url ,
                    publicImage:public_id ,
                    ceratedBy:req.user._id,
                    categoryId:category._id
                
                }})
            console.log(category);
            subcategory? res.status(200).json({message: "Done" , subcategory}) :
            next(new Error("Fail to add subCategory"))
            }
            
        }
    }
)
// //UpdateCategory
export const UpdateSubCategory = asyncHandler(
    async(req,res,next)=>{
        const {categoryId, id} =req.params;
        if (req.file) {
        const {secure_url , public_id} = await cloudinary.uploader.upload(req.file.path, {folder:`E-commerceProject/category/${categoryId}`}) 
        req.body.image = secure_url;
        req.body.publicImage= public_id;
        
        }  if (req.body.name) {
            req.body.slug=slugify(req.body.name)
        }        
            console.log(req.body);
            req.body.updatedBy = req.user._id
            const category = await findOneAndUpdate(
                {model:subcategoryModel , 
                filter:{_id:id , categoryId:categoryId},
                data:req.body,
                options:{new:false}
                })
                if (category) {
                    if (req.file) {
                    await cloudinary.uploader.destroy(category.publicImage)
                }
                    res.status(200).json({message: "Done" , category}) 
                } else {
                    await cloudinary.uploader.destroy(req.body.publicImage)
                    next(new Error("Fail to update category"))
                }
        
    }
) 
// //getAllCategory
export const getAllSubCategory = asyncHandler(
    async(req,res,next)=>{
        const{skip , limit} = paginate({page:req.query.page , size:req.query.size})
            const category = await find(
                {model:categoryModel , 
                    populate:[{
                        path:"ceratedBy",
                        select:"userName email image"
                    },{
                        path:"updatedBy",
                        select:"userName email image"
                    },{
                        path:"categoryId"
                        
                    }],
                    skip,
                    limit

                })

            return res.status(200).json({message: "Done" , category})
        
    }
) 

// //getCategoryById
export const getSubCategoryById = asyncHandler(
    async(req,res,next)=>{
            const category = await findById(
                {model:categoryModel , 
                    filter:{_id:req.params.id},
                    populate:[{
                        path:"ceratedBy",
                        select:"userName email image"
                    },{
                        path:"updatedBy",
                        select:"userName email image"
                    },{
                        path:"categoryId"
                    }],
                })
            return res.status(200).json({message: "Done" , category})
        
    }
) 

//DeleteSubCategory
export const DeleteSubCategory = asyncHandler(
    async (req, res, next) => {
        const { id } = req.params;
        const SubCategory = await findById({
            model: subcategoryModel,
            filter: { _id: id, isDeleted: false }
        });

        if (!SubCategory) {
            return next(new Error("category id is not found", { cause: 404 }));
        }

        const deleteSubCat = await findByIdAndUpdate({
            model: subcategoryModel,
            filter: { _id: id },
            data: { isDeleted: true },
            options: { new: true }
    });
    res.status(200).json({ message: "Category soft deleted", deleteSubCat });
}
);