const express = require("express");
const app = express();
const productsRouter = require("./routes/products");
const cartsRouter = require("./routes/carts");

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const PORT = 8080;

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

app.listen(PORT, () => console.log(`Server listening on PORT: ${PORT}`))