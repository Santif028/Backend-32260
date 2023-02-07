const http = require("http");
const app = require("./server");
const httpServer = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(httpServer);
const ProductManager = require("./controllers/productManager");
const products = new ProductManager("src/products.json");

io.on("connection", async (socket)  => {
    console.log("Cliente conectado");
    socket.emit("All products", await products.getProducts());
})

module.exports = {
    httpServer,
    emitProducts: async function (product) {
        await products.addProduct(product);
    },
    deleteProduct: async function (id) {
        await products.deleteProduct(id);
    },
};