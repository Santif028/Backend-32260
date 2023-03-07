import express from "express";
import { engine } from "express-handlebars";
import path from "path";
import productsRouter from "./routes/products.js";
import cartsRouter from "./routes/carts.js";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const app = express(); 

app.engine("handlebars", engine());
app.set("views", path.join(__dirname, "/views"))
app.set("view engine", "handlebars");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,"/public")));
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

app.get("/", (req, res) =>{
    res.send("Ruta raiz ok, acceder a /api/products");
})

export default app;