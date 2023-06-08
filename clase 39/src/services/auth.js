import UserRepository from "../repositories/users.repository.js";
import { serviceAddCart } from "./cart.js";
const userRepository = new UserRepository()

const serviceGetUserByEmail = async (email) => {
    let user = await userRepository.getUserByEmail(email);
    return user;
}

const serviceSaveUser = async (newUser) =>{
    let newCart  = await serviceAddCart()
    let savedUser = await userRepository.saveUser(newUser, newCart._id);
    return savedUser;
} 

const serviceLoginUser  = async (user) => {
    let userInDb = await userRepository.findUser(user);
    return userInDb;
}

export { serviceGetUserByEmail, serviceSaveUser, serviceLoginUser }
