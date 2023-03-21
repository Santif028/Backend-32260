import passport from "passport";
import GitHubStrategy from "passport-github2"; 
import { userModel } from "../db/models/users.model.js";

const initializePassport = () =>{
    passport.serializeUser((user, done) =>{
        done(null, user._id)
    })

    passport.deserializeUser(async (id, done) =>{
        let user = await userModel.findOne({_id: id});
        done(null, user)
    })

    passport.use("github", new GitHubStrategy({
        clientID: "Iv1.f885f50d7743364f",
        clientSecret: "ee1920082184c9e10af7c174f1b4e5fb20e59720",
        callbackURL: "http://localhost:8080/auth/githubcallback",
        scope: ["user:email"] 
    }, async (accessToken, refreshToken, profile, done) =>{
        try {
            console.log(profile);
            let user = await userModel.findOne({email: profile.emails[0].value})
            if(!user) {
                let newUser = {
                    first_name: profile._json.login,
                    last_name: "",
                    age: 21,
                    email: profile.emails[0].value,
                    password: ""
                }
                let res = await userModel.create(newUser)
                done(null, res);
            } else {
                done(null, user);
            }
        } catch (error) {
            done(error)
        }
    }))
}

export default initializePassport