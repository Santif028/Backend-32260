import {
    serviceGetUserByEmail,
    serviceSaveUser,
    serviceLoginUser
} from "../services/auth.js";
import { isValidPassword, createHash } from "../utils/index.js";



const loginForm = (req, res) => {
    res.render("login", { title: "Login", style: "index.css" });
}

const login = async (req, res) => {
    try {
        const user = await serviceLoginUser(req.body);
        const validPassword = isValidPassword(user, req.body.password);

        if (validPassword) {
            req.session.user = user;
            res.send({ status: "success", payload: "Login success", cartId: user.cartId });
        } else {
            res.status(404).send({ status: "error", payload: "Incorrect Email/Password" })
        }
    } catch (error) {
        res.status(404).send({ status: "error", payload: "Incorrect Email/Password" })
    }
}

const registerForm = async (req, res) => {
    res.render("register", { title: "Register", style: "index.css" });
}

const register = async (req, res) => {
    try {
        let user = await serviceLoginUser(req.body);
        console.log(user);
        if (!user.email) {
            await serviceSaveUser(req.body);
            res.status(201).send({ status: "success", message: "Registered Succesfully!", payload: user });
        } else {
            res.status(403).send({ status: "error", message: "Email already in use" });
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ status: "Error creating an account" })
    }
}

/* const restorePassword = async (req, res) => {
    const user = req.body
    if (!user) {
        res.render('register', { style: "index.css" });
    } else {
        const restorePassword = await serviceRestorePassword(user);
        res.render('login', { style: "index.css" });
    }
} */

const logout = (req, res) => {
    req.session.destroy((err) => {
        if (!err) {
            res.redirect("/auth/login");
        } else res.send({ status: "Logout Error", body: err });
    });
};

export { register, login, logout, registerForm, loginForm }