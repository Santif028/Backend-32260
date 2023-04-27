import { Router } from "express";
import { authMiddleware } from "../middlewares/index.js";
import { login, register, logout, loginForm, registerForm } from "../controllers/userManager.js";
import passport from "passport";
const authRouter = Router();

authRouter.get("/login", authMiddleware, loginForm);

authRouter.post("/login", authMiddleware, login);

authRouter.get("/register", authMiddleware, registerForm);

authRouter.post("/register", authMiddleware, register);



authRouter.get("/logout", logout)

authRouter.get("/github", passport.authenticate("github", { scope: ["user:email"] }), async (req, res) => { })

authRouter.get("/githubcallback", passport.authenticate("github", { failureRedirect: "/login" }), async (req, res) => {
    req.session.user = req.user;
    res.redirect("/api/products")
})

export default authRouter