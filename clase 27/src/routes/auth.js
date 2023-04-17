import { Router } from "express";
import mongoose from "mongoose";
import { sessionValidate, authMiddleware } from "../middlewares/index.js";
import { createHash, isValidPassword } from "../utils/index.js";
import { userModel } from "../db/models/users.model.js";
import passport from "passport";
const authRouter = Router();

authRouter.get("/login", sessionValidate, (req, res) => {
    res.render("login", {style: "index.css"});
});

authRouter.post("/login", sessionValidate, async (req, res) => {
    let user = req.body;
    let userFound = await userModel.findOne({ email: user.email })
    if (!userFound || !isValidPassword(userFound, user.password)) {
        res.render("login-error", { user,  style: "index.css" });
    } else {
        req.session.user = userFound.email;
        res.redirect("/api/products");
    }
});

authRouter.get("/register", sessionValidate, (req, res) => {
    res.render("register", { style: "index.css" });
});

authRouter.post("/register", sessionValidate, async (req, res) => {
    const { first_name, last_name, age, email, password } = req.body;
    let newUser = {
        first_name, 
        last_name, 
        age, email, 
        password: createHash(password)
    }
    try {
        let user = await userModel.findOne({email: newUser.email});
        if(user){
            res.render("register-error", { style: "index.css" });
        } 
        const userSaveModel = userModel(newUser);
        await userSaveModel.save();
    } catch (error) {
        console.log(error);
        res.render("register-error", { style: "index.css" });
    } 

    res.render("login", { message: "Registered Succesfully!", status: "success", style: "index.css"});
});

authRouter.get("/logged", authMiddleware, (req, res) =>{
    res.render("home", { user: req.session.user, title: "Products", style: "index.css" });
});

authRouter.get("/logout", (req, res) =>{
    req.session.destroy(error =>{
        res.redirect("/auth/login");
    });
});

authRouter.get('/restorePassword', (req, res) => {
    res.render('restore-password', {style: "index.css"});
});

authRouter.post('/restorePassword', sessionValidate,  async (req, res) => {
    let user = req.body;
    try {
        let userFound = await userModel.findOne({ email: user.email });
        if(!userFound){
            res.render('register', {style: "index.css"});
        }else{
            let newPassword = createHash(user.password);
            let result = await userModel.updateOne({ email: user.email }, { $set: { password: newPassword }});
            res.render('login', {style: "index.css"});
        }
    
    } catch (error) {
        console.log(error)
        res.render('register', {style: "index.css"});
    }
   
});

authRouter.get('/github', passport.authenticate('github', {scope: ['user:email']}), async(req, res) => {})

authRouter.get('/githubcallback', passport.authenticate('github', {failureRedirect: '/login'}), async (req, res) => {
    req.session.user = req.user;
    res.redirect('/api/products')
})

export default authRouter