import { create, find, findById, findByIdAndDelete, findByIdAndUpdate, findOne, findOneAndUpdate } from "../../../../DB/DBMethods.js";
import { asyncHandler } from "../../../services/errorHandling.js";
import cloudinary from "../../../services/cloudinary.js"
import slugify from'slugify'
import BrandModel from "../../../../DB/model/Brand.model.js"
import subcategoryModel from "../../../../DB/model/Subcategory.model.js"
import { paginate } from "../../../services/pagination.js";
import productModel from "../../../../DB/model/Product.model.js";


// //cerateProduct
export const createProduct =asyncHandler(
    async(req,res,next)=>{
        if (!req.files?.length) {
            next (new Error("image must be required" , {cause:400}))
        } else 
            {
                const {name , amount , price , discount ,subcategoryId ,categoryId ,brandId} = req.body;
                if (name) {
                    req.body.slug=slugify(name)
                }
                req.body.stock = amount
                req.body.finalPrice = price - (price * ((discount ||0)/100))
                

                const category = await findOne({
                    model:subcategoryModel,
                    filter:{_id: subcategoryId ,categoryId }
                })
                if (!category) {
                    next(new Error("invalid category or subCategory id" , {cause:404}))
                }

                
                const brand = await findOne({
                    model:BrandModel,
                    filter:{_id: brandId }
                })
                if (!brand) {
                    next(new Error("invalid brand id"  , {cause:404}))
                }
                const images= []
                const imagePublicIds = []
                for (const file of req.files) {
                    const {secure_url , public_id} = await cloudinary.uploader.upload(file.path , {folder:`E-commerceProject/product${name}`})
                    images.push(secure_url)
                    imagePublicIds.push(public_id)
                }
                req.body.images=images
                req.body.imagePublicIds=imagePublicIds
                req.body.createdBy = req.user._id

                const product = await create({
                    model:productModel,
                    data:req.body
                })
                res.status(201).json({message:'Done', product})

            }
            
        }
)
// //UpdateProduct
export const UpdateProduct= asyncHandler(
    async(req,res,next)=>{
        const {id} =req.params;

        const product = await findById({
            model:productModel,
            filter:{_id : id}
        })
        if (!product) {
            next(new Error("invalid product id"))
        }
        const {name ,amount , price , discount , subcategoryId , categoryId , brandId } = req.body;
        if (name) {
            req.body.slug=slugify(name)
        }
        if (amount) {
            const calcStock = amount - product.soldItems
            calcStock > 0 ?  req.body.stock = calcStock : req.body.stock = 0 
        }

        if (price && discount) {
            req.body.finalPrice = price - (price * (discount /100))
        }else if(price){
            req.body.finalPrice = price - (price * (product.discount /100)) 
        }else if (discount) {
            req.body.finalPrice = product.price - (product.price * (discount /100)) 
        }

        if (subcategoryId &&categoryId ) {
        const category = await findOne({
                    model:subcategoryModel,
                    filter:{_id: subcategoryId ,categoryId }
                })
                if (!category) {
                    next(new Error("invalid category or subCategory id" , {cause:404}))
                }
    }
                if (brandId) {
                    const brand = await findOne({
                    model:BrandModel,
                    filter:{_id: brandId }
                })
                if (!brand) {
                    next(new Error("invalid brand id"  , {cause:404}))
                }
                }
                req.body.updatedBy = req.user._id

                if (req.files && req.files.length) {
                const images= []
                const imagePublicIds = []
                for (const file of req.files) {
                    const {secure_url , public_id} = await cloudinary.uploader.upload(file.path , {folder:`E-commerceProject/product${name}`})
                    images.push(secure_url)
                    imagePublicIds.push(public_id)
                }
                req.body.images=images
                req.body.imagePublicIds=imagePublicIds
                }
                
                const UpdateProduct = await findByIdAndUpdate({
                    model:productModel,
                    data:req.body,
                    filter:{_id: product._id},
                    options:{new:false}
                })

                if (UpdateProduct) {
                    for (const imageID of product.imagePublicIds) {
                        await cloudinary.uploader.destroy(imageID)
                    }
                    res.status(200).json({message:'Done' , UpdateProduct})
                }else{
                    next(new Error(`fail to Update Product id : ${product._id} ` , {cause:400}))
                }
                
    }
) 
// getAllProduct
export const Products = asyncHandler(
    async(req, res, next) => {
        const {skip, limit} = paginate({page: req.query.page, size: req.query.size})
        const { search } = req.query;
        const filter = {};

            if (search) {
                filter.$or = [
                    { name: { $regex: search, $options: "i" } },        
                    { description: { $regex: search, $options: "i" } },
                    ];
    }
        const ProductLis = await find({
            model: productModel,
            filter: {},
            populate: [
                {
                    path: "createdBy",
                    select: "userName email image",
                },
                {
                    path: "updatedBy", 
                    select: "userName email image",
                },
                {
                    path: "categoryId",
                    select: "name slug image",
                },
                {
                    path: "subcategoryId", 
                    select: "name slug image categoryId",
                },
                {
                    path: "brandId", 
                    select: "name slug image",
                },
                
                {
                    path: 'review'
                }
            ],
            skip,
            limit
        })
        const finalProducts = [];
        for (let i = 0; i < ProductLis.length; i++) {
            let calcRating = 0;
            for (let j = 0; j < ProductLis[i].review.length; j++) {
                calcRating += ProductLis[i].review[j].rating;
            }
            const convObj = ProductLis[i].toObject();
            convObj.averageRating = calcRating / ProductLis[i].review.length;
            finalProducts.push(convObj);
        }

        res.status(200).json({message: "Done", ProductLis:finalProducts})
    }
)
//getProductById
export const ProductBYId = asyncHandler(
    async(req, res, next) => {
        const {id} =req.params;
        const Product = await findById({
            model: productModel,
            filter: {_id:id},
            populate: [
                {
                    path: "createdBy",
                    select: "userName email image",
                },
                {
                    path: "updatedBy", 
                    select: "userName email image",
                },
                {
                    path: "categoryId",
                    select: "name slug image",
                },
                {
                    path: "subcategoryId", 
                    select: "name slug image categoryId",
                },
                {
                    path: "brandId", 
                    select: "name slug image",
                },
            ],
        })
        if (!Product) {
            return next(new Error("Invalid product id", { cause: 404 }));
        }

        res.status(200).json({message: "Done", Product})
    }
)
//getProductById
export const DeleteProduct = asyncHandler(
    async(req, res, next) => {
        const {id} =req.params;
        const Product = await findById({
            model: productModel,
            filter: {_id:id},
        })
        if (!Product) {
            next(new Error('product id is not found' ,{cause:404}))
        } 
            const deletePro = await findByIdAndDelete({
                model:productModel,
                filter:{_id:id}
            })
            if (!deletePro) {
                next(new Error('product is not defined'))
            
        }
        
        

        res.status(200).json({message: "Done", deletePro})
    }
)