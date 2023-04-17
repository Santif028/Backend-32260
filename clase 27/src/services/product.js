import ProductsDAOMongoDb from "../db/daos/products.dao.js";
import { productSchema } from "../db/models/products.model.js";
const productDAO = new ProductsDAOMongoDb("products", productSchema);

const serviceGetProducts = async () => {
    let products = await productDAO.getProducts();
    return products;
}

const serviceGetProductById = async (pid) => {
    let product = await productDAO.getProductById(pid);
    return product;
}

const serviceAddProduct = async (product) => {
    let newProduct = await productDAO.addProduct(product);
    return newProduct;
}

const serviceUpdateProduct = async (pid, product) => {
    let updatedProduct = await productDAO.updateProduct(pid, product);
    return updatedProduct;
}

const serviceDeleteAllProducts = async () => {
    let deleteAllProducts = await productDAO.deleteAllProducts();
    return deleteAllProducts;
}

const serviceDeleteProductById = async (pid) => {
    let deletedProduct = await productDAO.deleteProductById(pid);
    return deletedProduct;
}

export { serviceAddProduct, serviceDeleteProductById, serviceDeleteAllProducts, serviceGetProductById, serviceGetProducts, serviceUpdateProduct};