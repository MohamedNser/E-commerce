import { Router } from "express";
import { auth } from "../../middleware/auth.js";
import endPoint from "./category.endPoint.js";
import { fileValidation, myMulter } from "../../services/multer.js";
import * as categoryRouter from './controller/category.js'
import  subcategoryRouter  from "../subcategory/subcategory.router.js";
const router = Router()

router.use('/:categoryId/subcategory',subcategoryRouter)
//createCategory
router.post('/',auth(endPoint.add), myMulter(fileValidation.image).single('image') , categoryRouter.cerateCategory)
//UpdateCategory
router.put('/:id',auth(endPoint.update), myMulter(fileValidation.image).single('image') , categoryRouter.UpdateCategory)
//getAllCategory
router.get('/', categoryRouter.getAllCategory)
//getCategoryById
router.get('/:id', categoryRouter.getCategoryById)


export default router