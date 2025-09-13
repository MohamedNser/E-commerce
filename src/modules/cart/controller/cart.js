import { create, findOne, findOneAndUpdate } from "../../../../DB/DBMethods.js";
import cartModel from "../../../../DB/model/cart.model.js";
import { asyncHandler } from "../../../services/errorHandling.js";



export const addToCart = asyncHandler(async (req, res, next) => {
    const { products } = req.body;
    const { _id: userId } = req.user;

        const findCart = await findOne({
            model: cartModel,
            filter: { userId }
        });

  // If no cart exists -> create new one
        if (!findCart) {
            const newCart = await create({
                model: cartModel,
                data: { userId, products }
            });
            return res.status(201).json({ message: "Done", cart: newCart });
        }

  // If cart exists -> loop over incoming products
        for (const product of products) {
            let match = false;
    // Loop through existing cart products
        for (let i = 0; i < findCart.products.length; i++) {
            if (product.productId == findCart.products[i].productId.toString()) {
        // If product already exists in cart:
        
        // Option 1: Replace the product with the new one
        //findCart.products[i] = product;

        // Option 2 (alternative): Increase quantity instead of replacing
        findCart.products[i].quantity += product.quantity;

        match = true;
        break;
    }
}

    // If product does not exist in cart -> push it
    if (!match) {
        findCart.products.push(product);
    }
}

  // Save updated cart in DB
    const updatedCart = await findOneAndUpdate({
        model: cartModel,
        filter: { userId },
        data: { products: findCart.products },
        options: { new: true }
});
    return res.status(201).json({ message: "Done", cart: updatedCart });
});
