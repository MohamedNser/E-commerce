import { Router } from "express";
import { auth } from "../../middleware/auth.js";
import { fileValidation, myMulter } from "../../services/multer.js";
import * as BrandRouter from './controller/brand.js'
import  endPoint from './brand.endPoint.js'
const router = Router()

//createBrand
router.post('/',auth(endPoint.add), myMulter(fileValidation.image).single('image') , BrandRouter.createBrand)
//updateBrand
router.put('/:id',auth(endPoint.update), myMulter(fileValidation.image).single('image') ,BrandRouter.UpdateBrand)
//getBrand
router.get('/', BrandRouter.getBrand)


export default router