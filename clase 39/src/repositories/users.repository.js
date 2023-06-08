import UsersDAOMongoDb from "../daos/usersMongooseDao.js";
import { userSchema } from "../models/users.model.js";
const userDAO = new UsersDAOMongoDb("users", userSchema)

class UserRepository {
    async getUserByEmail (email){ 
       const user = userDAO.getUserByEmail(email);
       return user;
    }
    async saveUser (newUser, cid){
        const savedUser =  userDAO.saveUser(newUser, cid);
        return savedUser;
    }

    async findUser (user) {
        const userInDb = userDAO.findUser(user);
        return userInDb;
    }
}

export default UserRepository