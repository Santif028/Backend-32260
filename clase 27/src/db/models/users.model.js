import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    first_name: {type: String, required: true, max: 100},
    last_name: {type: String, required: true, max: 100},
    email: {type: String, unique: true, required: true, max: 100},
    age: {type: Number, required: true},
    password: {type: String, required: true, max: 100}
})

const userModel = mongoose.model("users", userSchema);

export { userModel } 