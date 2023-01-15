const fs = require("fs");

class ProductManager {
    products;
    constructor(path) {
        this.path = path;
    }

    async getNewId() {
        let datos = await this.getProducts()
        if (datos.length == 0) {
            return 1
        } else {
            return datos[datos.length - 1].id + 1
        }
    }

    async addProduct(product) {
        product.id = await this.getNewId();
        let products = await this.getProducts();
        products.push(product);
        await fs.promises.writeFile(this.path, JSON.stringify(products));
    }
    async getProducts() {
        let products = await fs.promises.readFile(this.path, "utf-8");
        let objProduct = JSON.parse(products)
        return objProduct;
    }
    async getProductById(id) {
        let products = await this.getProducts();
        let findProduct = products.find(product => product.id === id)
        if (!findProduct) {
            console.error('Not found');
            return;
        } else {
            console.log(findProduct);
            return findProduct;
        }

    }

    async updateProduct(id, actualizar) {
        let products = await this.getProducts()
        let findProduct = products.findIndex(product => product.id === id)
        actualizar.id = id
        products.splice(findProduct, 1, actualizar)
        await fs.promises.writeFile(this.path, JSON.stringify(products))
    }
    async deleteProduct(id) {
        let products = await this.getProducts()
        let findProduct = products.findIndex(product => product.id === id)
        products.splice(findProduct, 1)
        await fs.promises.writeFile(this.path, JSON.stringify(products))
    }
}

// testing

const product1 = {
    title: "producto prueba",
    description: "este es un producto prueba",
    price: 200,
    thumbnail: "sin imagen",
    code: "abc123",
    stock: 15
}

const productUpdate = {
    title: "producto prueba2",
    description: "este es un producto prueba2",
    price: 200,
    thumbnail: "sin imagen",
    code: "abc124",
    stock: 16
}

const run = async () => {
    const manager = new ProductManager("./product.json");
    console.log(await manager.getProducts());
    await manager.addProduct(product1);
    console.log(await manager.getProducts());
    console.log(await manager.getProductById(1));
    await manager.updateProduct(1, productUpdate);
    console.log(await manager.getProducts());
    await manager.deleteProduct(1);
    console.log(await manager.getProducts());
}


run()