const fs = require("fs")

class CartManager {
    carts;
    products;
    constructor(path) {
        this.carts = path;
        this.products = path;
    };

    async getCarts() {
        let carts = await fs.promises.readFile(this.carts, "utf-8");
        let objCarts = JSON.parse(carts);
        return objCarts;
    };

    async addCart() {
        let carts = await this.getCarts();
        
        let id;
        carts.length === 0 ? (id = 1) : (id = carts[carts.length - 1].id + 1);
        
        let newCart = {
            id: id,
            products: []
        }
        carts.push(newCart);
        await fs.promises.writeFile(this.carts, JSON.stringify(carts));
    };

    async getCartById(id) {
        let carts = await this.getCarts();
        let findCart = carts.find((cart) => cart.id == id);
        return findCart;
    };

    async getProducts() {
        let products = await fs.promises.readFile(this.products, "utf-8");
        let objProducts = JSON.parse(products)
        return objProducts;
    }

    async addProductsToCart(cid, pid, product) {
        let carts = await this.getCarts(); 
        let cartId = carts.find((cart) => cart.id == cid)
        let isInCart = cartId.products.find((product) => product.id == pid);
        if (!isInCart) {
            cartId.products.push(product);
        } else {
            isInCart.quantity++;
        };
        await fs.promises.writeFile(this.carts, JSON.stringify(carts));
    };

}

module.exports = CartManager;