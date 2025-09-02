import { Schema, model, Types } from "mongoose";

const categorySchema = new Schema(
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
    isDeleted: {
    type: Boolean,
    default: false
},
    updatedBy:{
        type:Types.ObjectId,
        ref:"User"
    },
},
{
    timestamps: true,
    toJSON:{virtuals:true},
    toObject:{virtual:true}
}
);
categorySchema.virtual('subCategory',{
    ref:'subCategory',
    localField:"_id",
    foreignField:"categoryId"
})

const categoryModel = model("Category", categorySchema);
export default categoryModel;
