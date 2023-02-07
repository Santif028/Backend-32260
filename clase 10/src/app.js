const {httpServer} = require("./socket")

const PORT = 8080;

httpServer.listen(PORT, () => console.log(`Server listening on PORT: ${PORT}`))