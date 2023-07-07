import ProductsDAOMongoDb from "../daos/productsMongooseDao.js";
import { productSchema } from "../models/products.model.js";
const productDAO = new ProductsDAOMongoDb("products", productSchema)

class ProductRepository {
    async getProducts(filters) {
        return productDAO.getProducts(filters);
    }
    async getProductById(pid) {
        return productDAO.getProductById(pid);
    }
    async addProduct(product) {
        return productDAO.addProduct(product);
    }

    async getProductsDTO() {
        return productDAO.getAllProductsFromDTO();
    }

    async updateProduct(pid, product) {
        return productDAO.updateProduct(pid, product);
    }
    async deleteProductById(pid) {
        return productDAO.deleteProductById(pid);
    }
    async deleteAllProducts(){
        return productDAO.deleteAllProducts();
    }
}

export default ProductRepository