import express from "express";
import { engine } from "express-handlebars";
import session from "express-session";
import MongoStore from "connect-mongo";
import path from "path";
import authRouter from "./routes/auth.js";
import productsRouter from "./routes/products.js"; 
import cartsRouter from "./routes/carts.js";
import { fileURLToPath } from 'url';
import { authMiddleware } from "./middlewares/index.js";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const app = express(); 

app.engine("handlebars", engine());
app.set("views",(__dirname + "/views"))
app.set("view engine", "handlebars");

const mongoStore = MongoStore.create({
    mongoUrl: "mongodb+srv://santif028:sXWehvnDxoWcIdF7@ecommerce.2yqd6jz.mongodb.net/ecommerce?retryWrites=true&w=majority",
    mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
})

app.use(session({
    store: mongoStore,
    secret: "secretocoder",
    resave: false,
    saveUninitialized: false 
}))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));


app.use("/auth", authRouter)
app.use("/api/products", authMiddleware, productsRouter);
app.use("/api/carts", authMiddleware, cartsRouter);

app.get("/", (req, res) =>{
    res.redirect("/auth/login");
})

export default app;