import { findByIdAndUpdate, findOneAndUpdate } from "../../../../DB/DBMethods.js";
import userModel from "../../../../DB/model/User.model.js";
import { asyncHandler } from "../../../services/errorHandling.js";

//addWishlist
export const addWishlist = asyncHandler(
    async(req,res,next)=>{
        const {productId} = req.params;
        const updatedUser = await findByIdAndUpdate({
            model:userModel,
            filter:req.user._id,
            data:{$addToSet:{wishlist:productId}}
        })
        if (!updatedUser) {
    return next(new Error("Product not found or cannot be added to wishlist", { cause: 404 }));
}
    return res.status(200).json({ message: "Product added to wishlist", wishlist: updatedUser.wishlist });
    }
)
//RemoveWishlist
export const RemoveWishlist = asyncHandler(
    async(req,res,next)=>{
        const {productId} = req.params;
        const RemoveUser=  await findByIdAndUpdate({
            model:userModel,
            filter:req.user._id,
            data:{$pull:{wishlist:productId}}
        })
            if (!RemoveUser) {
                return next(new Error("Product not found or cannot be removed from wishlist", { cause: 404 }));
            }
            return res.status(200).json({ message: "Product added to wishlist", wishlist: RemoveUser.wishlist });
        
    }
)