import { userModel } from "../models/users.model.js";
import { ContenedorMongoDb } from "../persistence/mongoDbPersistence.js";
import UserDTO from "../DTOs/users.dto.js";

const userDtoFromObj = (obj) => {
    const { _id, first_name, last_name, email, age, password, role, cartId } = obj;
    let userDTO = new UserDTO(_id, first_name, last_name, email, age, password, role, cartId);
    return userDTO
}

class UsersDAOMongoDb extends ContenedorMongoDb {

    async getUserByEmail(email) {
        try {
            const user = userModel.findOne({ email: email }).lean();
            return userDtoFromObj(user);
        } catch (error) {
            throw new Error(error);
        }
    }

    async saveUser(newUser, cid) {
        try {
            const savedUser = await this.save({ ...newUser, cartId: cid });
            return userDtoFromObj(savedUser)
        } catch (error) {
            throw new Error(error);
        }
    }
    
    async findUser(user) {
        let existUser = await userModel.findOne({ email: user.email });
        if (!existUser) return { status:"error", payload: "Usuario inexistente" };
        return userDtoFromObj(existUser);
    }
}

export default UsersDAOMongoDb
