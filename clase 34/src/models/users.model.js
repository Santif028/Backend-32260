import mongoose from "mongoose";
import { createHash } from "../utils/index.js";
 
const userSchema = new mongoose.Schema({
    first_name: {type: String, required: true, max: 100},
    last_name: {type: String, required: true, max: 100},
    email: {type: String, unique: true, required: true, max: 100},
    age: {type: Number, required: true},
    password: {type: String, required: true, max: 100},
    role: {type: String, default: "user"},
    cartId: {type: String}
}
)

userSchema.pre("save", function (next) {
    const user = this;
    user.password = createHash(this.password);
    next();
})

const userModel = mongoose.model("users", userSchema);

export { userModel, userSchema } 