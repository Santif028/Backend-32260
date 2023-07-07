import app from "./server.js";

const PORT = process.env.PORT;

const server = app.listen(PORT, () => {
    console.log(`Server listening on: ${server.address().port}`)
})
server.on('error', error => console.log(error)) 