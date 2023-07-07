import { Router } from "express";
import { authMiddleware, adminOnly } from "../middlewares/index.js";
import { login, register, logout, loginForm, registerForm, getAllUsers, deleteAllUsers, deleteUserById, deleteInactiveUsers, adminView, updateUserRole } from "../controllers/userManager.js";
import passport from "passport";
const authRouter = Router();

authRouter.get("/login", loginForm);

authRouter.post("/login", login);

authRouter.get("/register", registerForm);

authRouter.post("/register", register);

authRouter.get("/", adminOnly, getAllUsers);

authRouter.put("/adminView/users/:uid", adminOnly, updateUserRole);

authRouter.delete("/adminView/users", adminOnly, deleteAllUsers);

authRouter.delete("/adminView/users/:uid", adminOnly, deleteUserById);

authRouter.get("/inactive", adminOnly, deleteInactiveUsers);

authRouter.get("/adminView", adminOnly, adminView );

authRouter.get("/logout", logout);

authRouter.get("/github", passport.authenticate("github", { scope: ["user:email"] }), async (req, res) => { })

authRouter.get("/githubcallback", passport.authenticate("github", { failureRedirect: "/login" }), async (req, res) => {
    req.session.user = req.user;
    res.redirect("/api/products");
})

export default authRouter 