import {
    serviceAddProduct,
    serviceDeleteProductById,
    serviceDeleteAllProducts,
    serviceGetProductById,
    serviceGetProducts,
    serviceUpdateProduct
} from "../services/product.js";



const getProducts = async (req, res) => {
    const { limit } = req.query;
    let products = await serviceGetProducts();
    if (!limit) {
        res.render("home", { products, title: "Products", style: "index.css" });

    } else {
        let products = products.slice(0, limit);
        res.render("home", { products, title: "Products", style: "index.css" });
    }
}

const getProductById = async (req, res) => {
    const id = req.params.pid;
    let product = await serviceGetProductById(id);
    res.render("details", { product, title: "Products", style: "index.css" });
}

const addProduct = async (req, res) => {
    const newProduct = await serviceAddProduct(req.body);
    res.send(newProduct);
}

const updateProduct = async (req, res) =>{
    const id = req.params.pid
    const updateProduct = await serviceUpdateProduct(id, req.body);
    res.send(updateProduct);
}

const deleteAllProducts = async (req, res) =>{
    const deleteAllProducts = await serviceDeleteAllProducts();
    res.send(deleteAllProducts);
}

const deleteProductById = async (req, res) =>{
    const id = req.params.pid;
    const deleteProductById = await serviceDeleteProductById(id);
    res.send(deleteProductById);
}

export { addProduct, getProducts, deleteAllProducts, deleteProductById, getProductById, updateProduct};