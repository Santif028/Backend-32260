import * as dotenv from "dotenv"
dotenv.config()

import express from "express";
import mongoose from "mongoose";
import { engine } from "express-handlebars";
import path from "path";
import session from "express-session";
import MongoStore from "connect-mongo";
import authRouter from "./src/routes/auth.js";
import productsRouter from "./src/routes/products.js";
import cartsRouter from "./src/routes/carts.js";
import mockRouter from "./src/routes/mockingProducts.js";
import { fileURLToPath } from 'url';
import { authMiddleware } from "./src/middlewares/index.js";
import initializePassport from "./src/config/passport.config.js";
import passport from "passport";
import errorHandler from "./src/middlewares/errors/index.js"
import addLogger from "./src/utils/logger.js";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUiExpress from "swagger-ui-express";


const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const app = express();

app.engine("handlebars", engine());
app.set("views", (__dirname + "/views"));
app.set("view engine", "handlebars");

initializePassport();

mongoose.connect(process.env.DB_URL);

app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.DB_URL,
        mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true }
    })
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

app.use(errorHandler);
app.use(addLogger);
app.use(passport.initialize());
app.use("/auth", authRouter);
app.use("/api/products", authMiddleware, productsRouter);
app.use("/api/carts", authMiddleware, cartsRouter);
app.use("/api/mockingProducts", mockRouter);

const swaggerOptions = {
    definition: {
        openapi: "3.0.1",
        info: {
            title: "Documentacion de la app",
            description: "API pensada para servicios ecommerce"
        }
    },
    apis: [`${__dirname}/src/docs/**/*.yaml`] 
}

const specs = swaggerJSDoc(swaggerOptions);
app.use("/api/docs", swaggerUiExpress.serve, swaggerUiExpress.setup(specs));

app.get("/", (req, res) => {
    res.redirect("/auth/login");
})

app.get('/loggerTest', (req, res) => {
    req.logger.warning('ALERTA!')
    res.send({ message: "Prueba de logger" })
});

export default app;