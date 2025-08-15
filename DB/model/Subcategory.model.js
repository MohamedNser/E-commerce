import { Schema, model, Types } from "mongoose";

const subcategorySchema = new Schema(
{
    name: {
        type: String,
        required: [true, " is required"],
        unique:true,
        min: [2, "minimum length 2 char"],
        max: [20, "max length 2 char"],
    },
    slug:String,
    image: String,
    publicImage:String,
    ceratedBy:{
        type:Types.ObjectId,
        ref:"User",
        required:true
    },
    updatedBy:{
        type:Types.ObjectId,
        ref:"User"
    },
    categoryId:{
        type:Types.ObjectId,
        ref:"category"
    },
},
{
    timestamps: true,
}
);

const subcategoryModel = model("subCategory", subcategorySchema);
export default subcategoryModel;
