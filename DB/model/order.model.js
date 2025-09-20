import { Schema, model, Types } from "mongoose";

const orderSchema = new Schema({
    userId: {
        type: Types.ObjectId,
        ref: "User",
    },
    products: [{
        productId: {
            type: Types.ObjectId,
            ref: "product"
        },
        unitPrice: {
            type: Number
        },
        quantity: {
            type: Number,
            default: 1
        },
        totalPrice: {
            type: Number,
            default: 1
        }
    }],
    address: { type: String, required: [true, 'address is required'] },
    phone: { type: String, required: [true, 'phone is required'] },
    paymentType: { // استخدم paymentType كما في الـ request
        type: String,
        default: "Cash",
        enum: ['Cash', 'card']
    },
    couponId: {
        type: Types.ObjectId,
        ref: "Coupon"
    },
    sumTotal: {
        type: Number,
        default: 1
    },
    totalPrice: {
        type: Number,
        default: 1
    },
    status: {
        type: String,
        default: "placed",
        enum: ['placed', 'received', 'rejected', 'onWay']
    }
}, {
    timestamps: true,
});

const orderModel = model('Order', orderSchema)
export default orderModel