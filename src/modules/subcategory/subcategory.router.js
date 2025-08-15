import { Router } from "express";
import { auth } from "../../middleware/auth.js";
import { fileValidation, myMulter } from "../../services/multer.js";
import * as subcategoryRouter from './subcategory.router.js'
const router = Router({mergeParams:true})

router.get('/', (req,res,next)=>{
    console.log({url:req.originalUrl});
    console.log({pp:req.params});
    res.json({message:'done'})
    
    
})

// router.post('/',auth(endPoint.add), myMulter(fileValidation.image).single('image') , categoryRouter.cerateCategory)
// router.put('/:id',auth(endPoint.update), myMulter(fileValidation.image).single('image') , categoryRouter.UpdateCategory)
// router.get('/', categoryRouter.getAllCategory)
// router.get('/:id', categoryRouter.getCategoryById)


export default router