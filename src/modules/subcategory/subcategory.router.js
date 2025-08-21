import { Router } from "express";
import { auth } from "../../middleware/auth.js";
import { fileValidation, myMulter } from "../../services/multer.js";
import * as subcategoryRouter from './controller/subCategory.js'
import  endPoint from './subCategory.js'
const router = Router({mergeParams:true})

// router.get('/', (req,res,next)=>{
//     console.log({url:req.originalUrl});
//     console.log({pp:req.params});
//     res.json({message:'done'})
    
    
// })

//createSubCategory
router.post('/',auth(endPoint.add), myMulter(fileValidation.image).single('image') , subcategoryRouter.cerateSubCategory)
//updateSubCategory
router.put('/:id',auth(endPoint.update), myMulter(fileValidation.image).single('image') , subcategoryRouter.UpdateSubCategory)
//getAllSubCategory
router.get('/', subcategoryRouter.getAllSubCategory)
//getCategoryById
router.get('/:id', subcategoryRouter.getSubCategoryById)


export default router