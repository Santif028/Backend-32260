const { Router } = require("express");
const fs = require("fs");
const cartsRouter = Router();
const CartManager = require("../controllers/cartManager");
const carts = new CartManager("src/carts.json");
const products = new CartManager("src/products.json");

cartsRouter.post("/add", async (req, res) => {
    await carts.addCart();
    res.send("Cart added successfully!");
});

cartsRouter.get("/:cid", async (req, res) => {
    let id = req.params.cid;
    let cartId = await carts.getCartById(id);
    if (!cartId) {
        res.status(404);
        res.send("ID not Found");
    } else {
        res.status(200);
        res.send(cartId.products);
    };
});

cartsRouter.post("/:cid/product/:pid", async (req, res) => {
    let cid = req.params.cid;
    let pid = req.params.pid;
    let getProducts = await products.getProducts();
    let productId = getProducts.find((product) => product.id == pid);
    let newProduct = { id: productId.id, quantity: 1 };

    await carts.addProductsToCart(cid, pid, newProduct);

    res.send("Product added successfully to the Cart");
});

module.exports = cartsRouter;