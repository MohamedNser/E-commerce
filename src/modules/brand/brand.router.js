import { Router } from "express";
import { auth } from "../../middleware/auth.js";
import { fileValidation, myMulter } from "../../services/multer.js";
import * as BrandRouter from './controller/brand.js'
import  endPoint from './brand.endPoint.js'
import { validation } from "../../middleware/validation.js";
import * as validators from "./brand.validation.js"

const router = Router()

//createBrand
router.post('/',auth(endPoint.add), myMulter(fileValidation.image).single('image')
,validation(validators.createBrandValidation) , BrandRouter.createBrand)
//updateBrand
router.put('/:id',auth(endPoint.update), myMulter(fileValidation.image).single('image')
,validation(validators.updateBrandValidation) ,BrandRouter.UpdateBrand)
//getBrand
router.get('/', BrandRouter.getBrand)


export default router