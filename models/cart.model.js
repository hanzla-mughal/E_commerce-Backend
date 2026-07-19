import mongoose from "mongoose";
const cartSchema=new mongoose.Schema({
    cart:[{
        product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product",
        required:true},
        quantity:{
            type:Number,
            required:true,
            default:1

        }
    }],
    user:{
         type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
},{
    timestamps: true,
})
export default mongoose.model("Cart",cartSchema)