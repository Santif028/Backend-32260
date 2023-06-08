import ProductRepository from "../repositories/products.repository.js";
const productRepository = new ProductRepository()

const serviceGetProducts = async (filters) => {
    let products = await productRepository.getProducts(filters);
    return products;
}

const serviceGetProductById = async (pid) => {
    let product = await productRepository.getProductById(pid);
    return product;
}

const serviceAddProduct = async (product) => {
    let newProduct = await productRepository.addProduct(product);
    return newProduct;
}

const serviceUpdateProduct = async (pid, product) => {
    let updatedProduct = await productRepository.updateProduct(pid, product);
    return updatedProduct;
}

const serviceDeleteAllProducts = async () => {
    let deleteAllProducts = await productRepository.deleteAllProducts();
    return deleteAllProducts;
}

const serviceDeleteProductById = async (pid) => {
    let deletedProduct = await productRepository.deleteProductById(pid);
    return deletedProduct;
}

export { serviceAddProduct, serviceDeleteProductById, serviceDeleteAllProducts, serviceGetProductById, serviceGetProducts, serviceUpdateProduct};