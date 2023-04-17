import mongoose from "mongoose";

 const cartSchema = mongoose.Schema({
    products: [{
        _id: false,
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'products',
        },
        quantity: { type: Number, default: 1 }
    }]
 });

 export default cartSchema;