import { Router } from "express";
import { auth } from "../../middleware/auth.js";
import { fileValidation, myMulter } from "../../services/multer.js";
import * as productRouter from './controller/product.js'
import  endPoint from './product.endPoint.js'
import { validation } from "../../middleware/validation.js";
import * as validators from "./product.validation.js"
import  wishlistRouter from "../wishlist/wishlist.router.js"
const router = Router()

router.use("/:productId/wishlist" , wishlistRouter)
//createProduct
router.post('/',auth(endPoint.add), myMulter(fileValidation.image).array('images' , 5)
,validation(validators.createProductValidation),productRouter.createProduct)
//updateProduct
router.put('/:id',auth(endPoint.update), myMulter(fileValidation.image).array('images',5)
,validation(validators.updateProductValidation),productRouter.UpdateProduct)
//getProduct
router.get('/', productRouter.Products)
//getProductById
router.get('/:id',validation(validators.getProductByIdValidation), productRouter.ProductBYId)
//DeleteProduct 
router.delete('/:id', productRouter.DeleteProduct)


export default router