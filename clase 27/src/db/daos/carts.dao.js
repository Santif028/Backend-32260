import {ContenedorMongoDb} from "../index.js";
/* import ProductsDAOMongoDb from "./products.dao.js";
import productSchema from "../models/products.model.js";
const productsDAO = new ProductsDAOMongoDb("products", productSchema); */

class CartsDAOMongoDB extends ContenedorMongoDb {

    async getCarts() {
        try {
            const allCarts = await this.getAll();
            return allCarts;
        } catch (error) {
            throw new Error(error);
        }
    }

    async getCartById(cid) {
        try {
            const cart = await this.getById(cid, "products.product");
            return cart;
        } catch (error) {
            throw new Error(error);
        }
    }

    async addCart() {
        try {
            const newCart = await this.save();
            return newCart;
        } catch (error) {
            throw new Error(error);
        }
    }

    async deleteCartById(cid) {
        try {
            const deletedCart = await this.delete(cid);
            return deletedCart;
        } catch (error) {
            throw new Error(error);
        }
    }

    async deleteAllCarts() {
        try {
            const deleteAll = await this.deleteAll();
            return deleteAll;
        } catch (error) {
            throw new Error(error);
        }
    }

    async getProductsInCart(cid) {
        try {
            const cart = await this.getCartById(cid)
            const products = cart.products;
            return products;
        } catch (error) {
            throw new Error(error);
        }
    }

    async addProductToCart(cid, pid) {
        try {
            const cart = await this.getCartById(cid)
            const productIndex = cart.products.findIndex((product)=> product._id === pid);
            if (productIndex >= 0) {
                cart.products[productIndex].quantity += 1
            } else {
                const newProduct = { product: pid };
                cart.products.push(newProduct);
            }
            const updatedCart = await this.update(cid, cart);
            return updatedCart.products;
        } catch (error) {
            throw new Error(error);
        }
    }

    async deleteProductInCart(cid, pid) {
        try {
            const cart = await this.getCartById(cid)
            const productIndex = cart.products.findIndex(p => String(p.product) === pid);
            cart.products.splice(productIndex, 1);
            const updatedCart = await this.update(cid, cart);
            return updatedCart;
        } catch (error) {
            throw new Error(error);
        }
    }

    /* async deleteAllProductsInCart(cid) {
        try {
            const cart = await this.getCartById(cid);

        } catch (error) {
            throw new Error(error);
        }
    } */
}

export default CartsDAOMongoDB;