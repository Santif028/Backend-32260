const form = document.getElementById("formRegister");
form.addEventListener("submit", (event) => {
    event.preventDefault();
    submitForm();
});

const submitForm = async () => {
    const first_name = document.getElementById("first_name").value;
    const last_name = document.getElementById("last_name").value;
    const email = document.getElementById("email").value;
    const age = document.getElementById("age").value;
    const password = document.getElementById("password").value;
    await fetch(`${window.location.href}`, {
        method: "post",
        mode: "cors",
        cache: "no-cache",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            first_name: first_name,
            last_name: last_name,
            email: email,
            age: age,
            password: password,
        }),
    }).then(async (res) => {
        data = await res.json();
        if (data.status === "error") {
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: data.payload,
                showConfirmButton: false,
                iconColor: 'var(--main-color)',
                background: 'var(--black)',
                timer: 1500
            })
        }
        if (data.status === 'success') {
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: data.payload,
                showConfirmButton: false,
                iconColor: 'var(--main-color)',
                background: 'var(--black)',
                timer: 1500
            })
            setTimeout(() => {
                window.location.replace("/auth/login");
            }, 1500);
        }
    });
}