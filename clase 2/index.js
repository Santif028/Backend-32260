class ProductManager {
    products;

    constructor() {
        this.products = []
    }

    getProducts() {
        console.log(this.products);
    }
    getNewId() {
        return this.products.length + 1;
    }

    validateProduct(id) {
        let product = this.products.find(elem => elem.id == id)
        return product;
    }

    validateCode(code) {
        let validar = (this.products.some(elem => elem.code === code));
        return validar;
    }

    addProduct(title, description, price, thumbnail, code, stock) {
        if (this.validateCode(code)) {
            console.log("Code ya existente ingresar otro");
        } else {
            if (title && description && price && thumbnail && code && stock) {
                this.products.push({
                    id: this.getNewId(),
                    title,
                    description,
                    price,
                    thumbnail,
                    code,
                    stock
                })
            } else {
                console.log("Ingrese todos los datos");
            }

        }
    }
    getProductById(idProduct) {
        let productIndex = this.validateProduct(idProduct)
        if (!this.validateProduct(idProduct)) {
            productIndex = "Not Found"
        }
        console.log(productIndex);
    }
}

//testing

const producto = new ProductManager()

producto.getProducts()
producto.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25)
producto.getProducts()
producto.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25)
producto.getProductById(1)