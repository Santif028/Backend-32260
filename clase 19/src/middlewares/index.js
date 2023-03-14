const authMiddleware = (req, res, next) =>{
    if(req.session.user){
        next();
    } else {
        res.render("login", {status: "failed", style: "index.css"})
    }
}

const sessionValidate = (req, res, next) =>{
    if(!req.session?.user){
        next();
    } else {
        res.render("home", { products, title: "Products", style: "index.css" })
    }
}

export {sessionValidate, authMiddleware}