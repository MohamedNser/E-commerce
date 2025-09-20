import { create, find, findById, findByIdAndUpdate, findOneAndUpdate } from "../../../../DB/DBMethods.js";
import { asyncHandler } from "../../../services/errorHandling.js";
import cloudinary from "../../../services/cloudinary.js"
import slugify from'slugify'
import { paginate } from "../../../services/pagination.js";
import BrandModel from "../../../../DB/model/Brand.model.js";

// //cerateBrand
export const createBrand =asyncHandler(
    async(req,res,next)=>{
        if (!req.file) {
        return next (new Error("image must be required" , {cause:400}))
        } else 
            {
                const {name} = req.body;
            const {secure_url , public_id} = await cloudinary.uploader.upload(req.file.path, {folder:"E-commerceProject/brand"}) 
            const subcategory = await create(
                {model:BrandModel , 
                data:{name,
                    slug:slugify(name)
                    ,image:secure_url ,
                    publicImage:public_id ,
                    ceratedBy:req.user._id,
                
                }})
            subcategory? res.status(200).json({message: "Done" , subcategory}) :
            next(new Error("Fail to add brand"))
            }
            
        }
)
// //UpdateBrand
export const UpdateBrand= asyncHandler(
    async(req,res,next)=>{
        const {id} =req.params;
        if (req.file) {
        const {secure_url , public_id} = await cloudinary.uploader.upload(req.file.path, {folder:"E-commerceProject/brand"}) 
        req.body.image = secure_url;
        req.body.publicImage= public_id;
        
        }  if (req.body.name) {
            req.body.slug=slugify(req.body.name)
        }        
            console.log(req.body);
            req.body.updatedBy = req.user._id
            const brand = await findOneAndUpdate(
                {model:BrandModel , 
                filter:{_id:id},
                data:req.body,
                options:{new:false}
                })
                if (brand) {
                    if (req.file) {
                    await cloudinary.uploader.destroy(brand.publicImage)
                }
                    res.status(200).json({message: "Done" , brand}) 
                } else {
                    await cloudinary.uploader.destroy(req.body.publicImage)
                    next(new Error("Fail to update brand"))
                }
        
    }
) 


// //getAllBrand
export const getBrand = asyncHandler(
    async(req,res,next)=>{
        const{skip , limit} = paginate({page:req.query.page , size:req.query.size})
            const category = await find(
                {model:BrandModel ,
                    filter:{},
                    populate:[{
                        path:"ceratedBy",
                        select:"userName email image"
                    }],
                    skip,
                    limit

                })

            return res.status(200).json({message: "Done" , category})
        
    }
) 
