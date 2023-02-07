const { Router } = require ("express");
const realTimeProducts = Router();

realTimeProducts.get("/", (req, res) =>{
    res.render("realTimeProducts", {style: "index.css"});
});

realTimeProducts.post("/", async (req, res) =>{
    require("../socket").emitProducts(req.body);
    res.end();
});

realTimeProducts.delete("/:id", (req, res) =>{
    require("../socket").deleteProduct(req.params.id);
    res.end();
});

module.exports = realTimeProducts;