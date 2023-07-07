const deleteUserById = async (uid) => {
    await fetch(`${window.location.href}/users/${uid}`, {
        method: "delete",
        mode: "cors",
        cache: "no-cache",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((response) => response.json())
        .then(() => {
            window.location.reload();
        });
};

const updateUserRole = async (uid) => {
    const newRole = document.getElementById(`newRole-${uid}`).value;
    const data = {}

    if (newRole) {
        data.uid = uid;
        data.newRole = newRole;
    }
    await fetch(`${window.location.href}/users/${uid}`, {
        method: "put",
        mode: "cors",
        cache: "no-cache",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }).then((response) => response.json())
        .then(() => {
            window.location.reload();
        })
        .catch((error) => {
            console.error("Error updating user role:", error);
        });

}

const deleteProductById = async (pid) => {
    await fetch(`http://localhost:8080/api/products/${pid}`, {
        method: "delete",
        mode: "cors",
        cache: "no-cache",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((response) => response.json())
        .then(() => {
            window.location.reload();
        });
}

const createNewProduct = async () => {
    const newTitle = document.getElementById("title").value;
    const newDescription = document.getElementById("description").value;
    const newPrice = document.getElementById("price").value;
    const newThumbnail = document.getElementById("thumbnail").value;
    const newCode = document.getElementById("code").value;
    const newStock = document.getElementById("stock").value;
    const newCategory = document.getElementById("category").value;

    const data = {
        title: newTitle,
        description: newDescription,
        price: newPrice,
        thumbnail: newThumbnail,
        code: newCode,
        stock: newStock,
        category: newCategory
    };

    await fetch(`http://localhost:8080/api/products/`, {
        method: "post",
        mode: "cors",
        cache: "no-cache",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    }).then((response) => response.json())
        .then(() => {
            window.location.reload();
        })
        .catch((error) => {
            console.error("Error creating new product:", error);
        })

}