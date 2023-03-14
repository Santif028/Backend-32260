import mongoose, { model } from "mongoose";
//import { paginate } from "mongoose-paginate-v2";


export const productSchema = mongoose.Schema({
    title: {type: String, required: true, max: 100},
    description: {type: String, required: true, max: 100},
    price: {type: Number, required: true},
    thumbnail: {type: String, required: true},
    code: {type: String, required: true},
    stock: {type: Number, required: true},
    status: {type: Boolean, default: true},
    category: {type: String, required: true}
}, {
    timestamps: true
})

//productSchema.plugin(paginate)