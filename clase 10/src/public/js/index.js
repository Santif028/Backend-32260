const socket = io();
let products = [];
const father = document.querySelector("#realTimeProducts");

socket.on("All products", async (res) => {
    products = res;
    addProducts();
});

document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("form").addEventListener("submit", (event) => {
        event.preventDefault();
        submitForm();
    });
});

const submitForm = async () => {
    const form = document.querySelector("form");
    const title = document.querySelector("#title").value;
    const description = document.querySelector("#description").value;
    const price = document.querySelector("#price").value;
    const thumbnail = document.querySelector("#thumbnail").value;
    const code = document.querySelector("#code").value;
    const stock = document.querySelector("#stock").value;
    const category = document.querySelector("#category").value;

    await fetch("http://localhost:8080/api/realtimeproducts", {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title: title,
            description: description,
            price: price,
            thumbnail: thumbnail,
            code: code,
            status: true,
            stock: stock,
            category: category
        }),
    });

    form.reset();
};

const addProducts = () => {
    const cards = products.map((product) => {
        const card = document.createElement("div");
        card.className = "card";
        card.style = "width: 16rem;";

        card.innerHTML = `
      <button onclick="deleteProduct(${product.id})" class="iconTrash">
        <svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>
      </button>
      <img src=${product.thumbnail} class="card-img-top" alt="...">
      <div class="card-body d-flex flex-column align-items-center">
        <h5 class="card-title">${product.title}</h5>
        <p class="card-text">${product.description}</p>
        <p class="card-text">Price: $${product.price}</p>
        <a href="/api/products/${product.id}" class="btn btn-primary">More details</a>
      </div>
    `;

        return card;
    });

    father.innerHTML = "";

    for (const card of cards) {
        father.appendChild(card);
    }
};
const deleteProduct = async (id) => {
    await fetch(`http://localhost:8080/api/realtimeproducts`, {
        method: "DELETE",
        mode: "cors",
        cache: "no-cache",
        headers: {
            "Content-Type": "application/json",
        },
    });
};

const console = () => {
    window.console.log(products);
};