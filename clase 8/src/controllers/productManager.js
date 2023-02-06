const fs = require("fs");

class ProductManager {
    products;
    constructor(path) {
        this.path = path;
    }

    async getProducts() {
        let products = await fs.promises.readFile(this.path, "utf-8");
        let objProduct = JSON.parse(products);
        return objProduct;
    }

    async addProduct(product) {
        let products = await this.getProducts();
        if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock || !product.category) {
            throw new Error("All fields are required");
        };

        const existingProduct = products.find((e) => e.code === product.code);
        if (existingProduct) {
            throw new Error("Code already exists");
        };

        let id;
        products.length === 0 ? (id = 1) : (id = products[products.length - 1].id + 1);

        const newProduct = {
            id: id,
            title: product.title,
            description: product.description,
            price: product.price,
            thumbnail: product.thumbnail,
            code: product.code,
            status: true,
            stock: product.stock,
            category: product.category
        };
        products.push(newProduct);
        await fs.promises.writeFile(this.path, JSON.stringify(products));
    }

    async getProductById(id) {
        let products = await this.getProducts();
        let findProduct = products.find((product) => product.id == id);
        return findProduct;
    }

    async updateProduct(id, update) {
        let products = await this.getProducts();
        if (!update.title || !update.description || !update.price || !update.thumbnail || !update.code || !update.stock || !update.category) {
            throw new Error("All fields are required");
        };
        let findProduct = products.findIndex(product => product.id === id);
        update.id = id;
        products.splice(findProduct, 1, update);
        await fs.promises.writeFile(this.path, JSON.stringify(products));
    }
    async deleteProduct(id) {
        let products = await this.getProducts();
        let findProduct = products.findIndex(product => product.id === id);
        products.splice(findProduct, 1);
        await fs.promises.writeFile(this.path, JSON.stringify(products));
    }
}

module.exports = ProductManager;