import { ContenedorMongoDb } from "../persistence/mongoDbPersistence.js";
import { productModel } from "../models/products.model.js"
import ProductDTO from "../DTOs/products.dto.js";
import EErrors from "../services/errors/enums.js";
import CustomError from "../services/errors/customError.js";
import { generateProductErrorInfo } from "../services/errors/info.js";

const productDtoFromObject = (obj) => {
    const { _id, title, description, code, price, stock, category, thumbnail } = obj;
    return new ProductDTO(_id, title, description, code, price, stock, category, thumbnail);
}

class ProductsDAOMongoDb extends ContenedorMongoDb {

    async getProducts({ query, limit, page, sort }) {
        const setLimit = limit ? limit : 10
        const setPage = page ? page : 1
        const setSort = sort ? { price: sort } : {}
        const setQuery = query ? { category: query } : {}
        const options = {
            limit: setLimit,
            page: setPage,
            sort: setSort,
            lean: true
        }
        try {
            const products = await productModel.paginate(setQuery, options);
            return { ...products, setQuery, options };
        } catch (error) {
            throw new Error(error)
        }
    }

    async getProductById(pid) {
        try {
            const product = await productModel.findOne({ _id: pid });
            if (!product) {
                return { error: `Product with id: ${pid} not found` }
            }

            return productDtoFromObject(product)
        } catch (error) {
            throw new Error(error)
        }
    }

    async addProduct(product) {
        try {
            const { title, description, price, thumbnail, code, stock, category } = product
            if (!title || !description || !price || !thumbnail || !code || !stock || !category) {
                CustomError({
                    name: "Product creation error",
                    cause: generateProductErrorInfo({ title, description, price, thumbnail, code, stock, category }),
                    mesasge: "Error trying to create Product",
                    code: EErrors.INVALID_TYPES_ERROR
                });
            } else {
                const newProduct = await this.save(product);
                return productDtoFromObject(newProduct)
            }
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
            return productDtoFromObject(deletedProduct);
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