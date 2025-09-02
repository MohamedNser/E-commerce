import { Router } from "express";
import { auth } from "../../middleware/auth.js";
import endPoint from "./category.endPoint.js";
import { fileValidation, myMulter } from "../../services/multer.js";
import * as categoryRouter from './controller/category.js'
import { validation } from "../../middleware/validation.js";
import * as validators from "./category.validation.js"
import  subcategoryRouter  from "../subcategory/subcategory.router.js";
const router = Router()

router.use('/:categoryId/subcategory',subcategoryRouter)
//createCategory
router.post('/',auth(endPoint.add),
myMulter(fileValidation.image).single('image')
,validation(validators.createCategoryValidation) , categoryRouter.cerateCategory)
//UpdateCategory
router.put('/:id',auth(endPoint.update), myMulter(fileValidation.image).single('image') 
,validation(validators.updateCategoryValidation), categoryRouter.UpdateCategory)
//getAllCategory
router.get('/', categoryRouter.getAllCategory)
//getCategoryById
router.get('/:id', categoryRouter.getCategoryById)
//DeleteProduct
router.delete('/:id' , categoryRouter.DeleteCategory)


export default router