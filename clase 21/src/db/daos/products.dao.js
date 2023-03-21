import ContenedorMongoDb from "../index.js";

class ProductsDAOMongoDb extends ContenedorMongoDb {

    async getProducts() {
        try {
            const products = await this.getAll();
            return products;
        } catch (error) {
            throw new Error(error)
        }
    }

    async getProductById(pid) {
        try {
            const product = await this.getById(pid);
            return product;
        } catch (error) {
            throw new Error(error)
        }
    }

    async addProduct(product) {
        try {
            const newProduct = await this.save(product);
            return newProduct;
        } catch (error) {
            throw new Error(error)
        }
    }

    async updateProduct(pid, product) {
        try {
            const updatedProduct = await this.update(pid, product);
            return updatedProduct;
        } catch (error) {
            throw new Error(error);
        }
    }

    async deleteProductById(pid) {
        try {
            const deletedProduct = await this.delete(pid);
            return deletedProduct;
        } catch (error) {
            throw new Error(error);
        }
    }

    async deleteAllProducts() {
        try {
            const deleteAll = await this.deleteAll();
            return deleteAll
        } catch (error) {
            throw new Error(error);
        }
    }
}

export default ProductsDAOMongoDb