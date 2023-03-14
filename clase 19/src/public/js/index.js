const deleteProductInCart = async (pid) => {
    await fetch(`${window.location.href}/product/${pid}`, {
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