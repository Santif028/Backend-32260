const fs = require("fs");

class ProductManager {
    products;
    constructor(path) {
        this.path = path;
    }

    async addProduct(title, description, price, thumbnail, code, stock) {
        if (this.products.find(product => product.code === product.code)) return;
        if (title === "" || description == "''" || isNaN(price) || thumbnail == "" || isNaN(code) || isNaN(stock)) return;
        let product = {
            id: this.products.length + 1,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        };
        let products = await this.getProducts();
        products.push(product);
        await fs.promises.writeFile(this.path, JSON.stringify(products));
    }
    async getProducts() {
        let products = await fs.promises.readFile(this.path, "utf-8");
        let objProduct = JSON.parse(products);
        return objProduct;
    }
    async getProductById(id) {
        let products = await this.getProducts();
        let findProduct = products.find((product) => product.id == id);
        if (!findProduct) {
            console.error('Not found');
            return;
        } else {
            return findProduct;
        }

    }

    async updateProduct(id, actualizar) {
        let products = await this.getProducts();
        let findProduct = products.findIndex(product => product.id === id);
        actualizar.id = id;
        products.splice(findProduct, 1, actualizar);
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