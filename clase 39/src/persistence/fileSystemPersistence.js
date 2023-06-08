import fs from "fs"

class ContenedorFileSystem {
    constructor(path) {
        this.path = path;
    };

    async getById(id) {
        try {
            const docs = await this.getAll()
            const findDoc = docs.find((doc) => doc.id = id)
        } catch (error) {

        }
    }

    async getAll() {
        try {
            const docs = await fs.promises.readFile(this.path, "utf-8");
            const objDocs = JSON.parse(docs);
            return objCarts;
        } catch (error) {
            throw new Error(`Error trying to get products: ${error}`);
        }
    };

    async save(data) {
        try {
            const docs = await this.getAll();
            let id = docs.length === 0 ? (id = 1) : (id = docs[docs.length - 1].id + 1);
            data.id = id;
            docs.push(data)
            await fs.promises.writeFile(this.path, JSON.stringify(docs));
        } catch (error) {
            throw new Error(`Error trying to get products: ${error}`);
        }
    };

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

export default ContenedorFileSystem