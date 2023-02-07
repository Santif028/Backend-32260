const express = require("express");
const app = express();
const { engine } = require("express-handlebars");
const path = require("path");
const productsRouter = require("./routes/products");
const cartsRouter = require("./routes/carts");
const realTimeProducts = require("./routes/realTimeProducts")

app.engine("handlebars", engine());
app.set("views", path.join( __dirname, "/views"))
app.set("view engine", "handlebars");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/public")))
 
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/realtimeproducts", realTimeProducts);

app.get("/", (req, res) =>{
    res.send("Ruta raiz ok, acceder a /api/products");
})


module.exports = app;