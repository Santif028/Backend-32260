import {
    serviceGetAllUsers,
    /* serviceGetUserByEmail */
    serviceSaveUser,
    serviceLoginUser,
    serviceDeleteAllUsers,
    serviceDeleteUserById,
    serviceUpdateUserRole
} from "../services/auth.js";
import { serviceGetProducts, serviceProductsFromDTO } from "../services/product.js";
import { isValidPassword } from "../utils/index.js";
import { transporter } from "../utils/mail.js";
import { userModel } from "../models/users.model.js";

const loginForm = (req, res) => {
    res.render("login", { title: "Login", style: "index.css" });
}

const login = async (req, res) => {
    try {
        const user = await serviceLoginUser(req.body);
        const validPassword = isValidPassword(user, req.body.password);
        if (validPassword) {
            const userDate = await userModel.findOneAndUpdate({ email: user.email }, { lastLoginDate: new Date() }, { new: true });
            req.session.user = user;
            const response = {
                status: "success",
                payload: {
                    message: "Login Success",
                    cartId: user.cartId,
                    userDate: userDate,
                },
                redirectTo: "/api/products", // Ruta a la cual redirigir
            };
            res.send(response);
        } else {
            res.status(404).send({ status: "error", payload: "Incorrect Email/Password" })
        }
    } catch (error) {
        res.status(500).send({ status: "error", payload: "Error with the server" });
    }
}

const registerForm = async (req, res) => {
    res.render("register", { title: "Register", style: "index.css" });
}

const register = async (req, res) => {
    try {
        let user = await serviceLoginUser(req.body);
        if (!user.email) {
            await serviceSaveUser(req.body);
            res.status(201).send({ status: "success", message: "Registered Succesfully!", payload: user });
        } else {
            res.status(403).send({ status: "error", message: "Email already in use" });
        }
    } catch (error) {
        res.status(500).send({ status: "Error creating an account" })
    }
}

const getAllUsers = async (req, res) => {
    try {
        const allUsers = await serviceGetAllUsers();
        res.status(200).send({ status: "success", message: "All users found", allUsers });
    } catch (error) {
        res.status(500).send({ status: "Error finding all users" })
    }
}

const updateUserRole = async (req, res) => {
    try {
        const { uid, newRole } = req.body;
        const updatedUser = await serviceUpdateUserRole(uid, newRole);
        res.status(200).send({ status: "success", message: "User role updated", user: updatedUser });
    } catch (error) {
        res.status(500).send({ status: "Error updating user role" });
    }
}

const deleteAllUsers = async (req, res) => {
    try {
        await serviceDeleteAllUsers();
        res.status(200).send({ status: "success", message: "All users deleted" });
    } catch (error) {
        res.status(500).send({ status: "Error deleting all users" })
    }
}

const deleteUserById = async (req, res) => {
    try {
        let uid = req.params.uid;
        if (!uid) {
            res.status(404).send({ status: "error", payload: "User not found" })
        } else {
            await serviceDeleteUserById(uid);
            res.status(200).send({ status: "success", message: "User deleted" });
        }
    } catch (error) {
        res.status(500).send({ status: "Error deleting user" });
    }
}

const deleteInactiveUsers = async (req, res) => {
    try {
        // Obtén la fecha actual hace dos días
        const twoDaysAgo = new Date();
        twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

        // Encuentra y elimina los usuarios inactivos
        const inactiveUsers = await userModel.deleteMany({
            lastLoginDate: { $lt: twoDaysAgo },
        });

        // Envía correos electrónicos a los usuarios eliminados
        inactiveUsers.forEach((user) => {
            const mailOptions = {
                from: process.env.GMAIL,
                to: user.email,
                subject: 'Eliminación de cuenta por inactividad',
                text: 'Tu cuenta ha sido eliminada debido a la inactividad durante dos días.',
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    res.json('Error sending email:', error);
                } else {
                    res.json('Email sent:', info.response);
                }
            });
        });

        res.json({ message: 'Usuarios inactivos eliminados correctamente.' });
    } catch (error) {
        console.error('Error trying to delete inactive users:', error);
        res.status(500).json({ error: 'Error trying to delete inactive users.' });
    }
}

const isUserAdmin = (user) => {
    return user && user.role === 'admin';
};

const adminView = async (req, res) => {
    const allUsers = await serviceGetAllUsers();
    const allProducts = await serviceProductsFromDTO();
    const user = req.session.user;
    const isAdmin = isUserAdmin(user);
    res.render("admin-only", { user, isAdmin, allUsers, allProducts, style: "index.css" });
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

export { register, login, logout, registerForm, loginForm, getAllUsers, deleteAllUsers, deleteUserById, deleteInactiveUsers, adminView, updateUserRole }