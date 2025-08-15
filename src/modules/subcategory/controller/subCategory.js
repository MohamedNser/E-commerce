// import { create, find, findByIdAndUpdate } from "../../../../DB/DBMethods.js";
// import { asyncHandler } from "../../../services/errorHandling.js";
// import cloudinary from "../../../services/cloudinary.js"
// import slugify from'slugify'
// import categoryModel from "../../../../DB/model/Category.model.js";
// import { paginate } from "../../../services/pagination.js";

// //cerateCategory
// export const cerateCategory =asyncHandler(
//     async(req,res,next)=>{
//         if (!req.file) {
//             next (new Error("image must be required" , {cause:400}))
//         } else {
//             const {name} = req.body;
//             const {secure_url , public_id} = await cloudinary.uploader.upload(req.file.path, {folder:"E-commerceProject"}) 
//             const category = await create(
//                 {model:categoryModel , 
//                 data:{name,
//                     slug:slugify(name)
//                     ,image:secure_url ,
//                     publicImage:public_id ,
//                     ceratedBy:req.user._id
                
//                 }})
//             console.log(category);
//             category ? res.status(200).json({message: "Done" , category}) : next(new Error("Fail to add category"))
//         }
//     }
// )
// //UpdateCategory
// export const UpdateCategory = asyncHandler(
//     async(req,res,next)=>{
//         const {id} =req.params;
//         if (req.file) {
//         const {secure_url , public_id} = await cloudinary.uploader.upload(req.file.path, {folder:"E-commerceProject"}) 
//         req.body.image = secure_url;
//         req.body.publicImage= public_id;
//         }  if (req.body.name) {
//             req.body.slug=slugify(req.body.name)
//         }        
//             console.log(req.body);
//             req.body.updatedBy = req.user._id
//             const category = await findByIdAndUpdate(
//                 {model:categoryModel , 
//                 filter:{_id:id},
//                 data:req.body,
//                 options:{new:false}
//                 })
//                 if (req.file) {
//                     await cloudinary.uploader.destroy(category.publicImage)
//                 }
//             category ? res.status(200).json({message: "Done" , category}) : next(new Error("Fail to update category"))
        
//     }
// ) 
// //getAllCategory
// export const getAllCategory = asyncHandler(
//     async(req,res,next)=>{
//         const{skip , limit} = paginate({page:req.query.page , size:req.query.size})
//             const category = await find(
//                 {model:categoryModel , 
//                     populate:[{
//                         path:"ceratedBy",
//                         select:"userName email image"
//                     },{
//                         path:"updatedBy",
//                         select:"userName email image"
//                     }],
//                     skip,
//                     limit

//                 })

//             res.status(200).json({message: "Done" , category})
        
//     }
// ) 

// //getCategoryById
// export const getCategoryById = asyncHandler(
//     async(req,res,next)=>{
//             const category = await findById(
//                 {model:categoryModel , 
//                     filter:{_id:req.params.id},
//                     populate:[{
//                         path:"ceratedBy",
//                         select:"userName email image"
//                     },{
//                         path:"updatedBy",
//                         select:"userName email image"
//                     }],
//                 })
//             res.status(200).json({message: "Done" , category})
        
//     }
// ) 