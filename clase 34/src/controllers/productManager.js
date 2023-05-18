import {
    serviceAddProduct,
    serviceDeleteProductById,
    serviceDeleteAllProducts,
    serviceGetProductById,
    serviceGetProducts,
    serviceUpdateProduct
} from "../services/product.js";
import { serviceGetUserByEmail, serviceLoginUser } from "../services/auth.js";

const getProducts = async (req, res) => {
    try {
        const products = await serviceGetProducts(req.query);
        let user = await serviceLoginUser(req.session?.user);
        const hasNextPage = products.hasNextPage
        const hasPrevPage = products.hasPrevPage
        const sort = products.sort
        const page = products.page
        const query = products.query
        const allCategories = products.docs.map(element => element.category)
        const categories = allCategories.filter((element, index, self) => self.indexOf(element) === index);
        res.render("home", { title: "Products", style: "index.css", products, hasNextPage, hasPrevPage, sort, page, query, categories, user });

    } catch (error) {
        res.status(500).send(error.message)
    }
}

const getProductById = async (req, res) => {
    const id = req.params.pid;
    let product = await serviceGetProductById(id);
    let user = await serviceLoginUser(req.session?.user);
    res.render("details", { product, user, title: "Products", style: "index.css" });
}

const addProduct = async (req, res) => {
    const newProduct = await serviceAddProduct(req.body);
    res.send(newProduct);
}

const updateProduct = async (req, res) => {
    const id = req.params.pid
    const updateProduct = await serviceUpdateProduct(id, req.body);
    res.send(updateProduct);
}

const deleteAllProducts = async (req, res) => {
    const deleteAllProducts = await serviceDeleteAllProducts();
    res.send(deleteAllProducts);
}

const deleteProductById = async (req, res) => {
    const id = req.params.pid;
    const deleteProductById = await serviceDeleteProductById(id);
    res.send(deleteProductById);
}

export { addProduct, getProducts, deleteAllProducts, deleteProductById, getProductById, updateProduct };