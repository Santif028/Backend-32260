const express = require("express");
const app = express();

const ProductManager = require("../productManager");
const manager = new ProductManager("src/product.json");

app.use(express.urlencoded({extended: true}));

const PORT = 8080;

app.get("/", (req, res) =>{
    res.send("Main Page")
});

app.get("/products", async (req, res) =>{
    let {limit} = req.query;
    let products = await manager.getProducts(limit);
    res.send(products.slice(0, limit))
});

app.get("/products", async (req, res) =>{
    let products = await manager.getProducts();
    res.send(products)
});

app.get("/products/:id", async (req, res) =>{
    let id = req.params.id;
    let productId = await manager.getProductById(id);
    if(!productId) {
        res.send("ID no encontrado")
    } else {
        res.send(productId)
    }
});

app.listen(PORT, () => console.log(`Server listening on PORT: ${PORT}`))