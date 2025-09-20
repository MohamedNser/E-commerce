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

//getCart
export const getCart = asyncHandler(async (req, res, next) => {
    const { _id: userId } = req.user;

    const cart = await findOne({
        model: cartModel,
        filter: { userId },
        populate: [
            { path: "products.productId", select: "name price" }
        ]
    });

    if (!cart) {
        return res.status(404).json({ message: "Cart is empty" });
    }

    return res.status(200).json({ message: "Done", cart });
});

//removeFromCart
export const removeFromCart = asyncHandler(async (req, res, next) => {
    const { productId } = req.body;
    const { _id: userId } = req.user;

    const cart = await findOne({
        model: cartModel,
        filter: { userId }
    });

    if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
    }

    const updatedProducts = cart.products.filter(
    (product) => product.productId.toString() !== productId
);

    const updatedCart = await findOneAndUpdate({
        model: cartModel,
        filter: { userId },
        data: { products: updatedProducts },
        options: { new: true }
    });

    return res.status(200).json({ message: "Product removed", cart: updatedCart });
});

//clearCartToUser
export const clearCart = asyncHandler(async (req, res, next) => {
    const { _id: userId } = req.user;

    const cart = await findOne({
        model: cartModel,
        filter: { userId }
    });

    if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
    }

    cart.products = [];
    await cart.save();

    return res.status(200).json({ message: "Cart cleared", cart });
});

//updateQuantity
export const updateQuantity = asyncHandler(async (req, res, next) => {
    const { productId, quantity } = req.body;
    const { _id: userId } = req.user;

    const cart = await findOne({
        model: cartModel,
        filter: { userId }
    });

    if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
    }
    const product = cart.products.find(
    (p) => p.productId.toString() === productId
);

    if (!product) {
        return res.status(404).json({ message: "Product not in cart" });
    }

    product.quantity = quantity;
    await cart.save();

    return res.status(200).json({ message: "Quantity updated", cart });
});
