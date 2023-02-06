const { Router } = require("express");
const productsRouter = Router();
const ProductManager = require("../controllers/productManager");
const products = new ProductManager("src/products.json");

productsRouter.get("/", async (req, res) => {
    let { limit } = req.query;
    let getProducts = await products.getProducts();
    res.send(getProducts.slice(0, limit));
});

productsRouter.get("/:pid", async (req, res) => {
    let id = req.params.pid;
    let productId = await products.getProductById(id);
    if (!productId) {
        res.status(404);
        res.send("ID not found");
    } else {
        res.status(200);
        res.send(productId);
    }
});

productsRouter.post("/add", async (req, res) => {
    let newProduct = req.body
    await products.addProduct(newProduct);
    res.send("Product added successfully!");
});

productsRouter.put("/:pid", async (req, res) => {
    let id = req.params.pid;
    let update = req.body;
    let idNum = parseInt(id);
    await products.updateProduct(idNum, update);
    res.send("Product updated successfully!");
});

productsRouter.delete("/:pid", async (req, res) => {
    let id = req.params.pid;
    console.log(id);
    let idNum = parseInt(id);
    await products.deleteProduct(idNum);
    res.send("Product deleted successfully!");
});

module.exports = productsRouter;