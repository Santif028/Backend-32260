import { loadStripe } from "@stripe/stripe-js";

const addProductToCart = async (cid, pid) => {
  const baseUrl = `${window.location.protocol}//${window.location.host}/api/`;
  const endpoint = `carts/${cid}/product/${pid}`;
  const url = `${baseUrl}${endpoint}`;

  await fetch(url, {
    method: "post",
    mode: "cors",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
  });
  getCart();
};
const deleteProductInCart = async (pid) => {
  await fetch(`${window.location.href}/product/${pid}`, {
    method: "delete",
    mode: "cors",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.json())
    .then(() => {
      window.location.reload()
    });
};
const deleteProductsInCart = async () => {
  await fetch(`${window.location.href}`, {
    method: "delete",
    mode: "cors",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.json())
    .then(() => {
      window.location.reload()
    });

};
const minusQuantity = async (pid) => {
  const row = document.querySelector(`.product${pid}`);
  let quantity = row.querySelector(".quantity");
  if (Number(quantity.innerHTML) !== 0) {
    quantity.innerHTML = Number(quantity.innerHTML) - 1;
    await getQuantityInCart() + 1

    setQuantity(pid);
  }
};
const plusQuantity = async (pid) => {
  const row = document.querySelector(`.product${pid}`);
  let quantity = row.querySelector(".quantity");
  quantity.innerHTML = Number(quantity.innerHTML) + 1;
  await getQuantityInCart() + 1
  setQuantity(pid);
};

const setQuantity = async (pid) => {
  const row = document.querySelector(`.product${pid}`);
  let quantity = row.querySelector(".quantity").innerHTML;

  await fetch(`${window.location.href}/product/${pid}`, {
    method: "put",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ quantity: Number(quantity) }),
  })
  await getCart()
};

const handlePayment = async (cid) => {
  try {
    const payButton = document.getElementById('pay-button');
    payButton.disabled = true;

    const stripeClient = await loadStripe(process.env.STRIPE_PUBLIC_KEY);

    const elements = stripeClient.elements()
    const cardElement = elements.create('card');

    cardElement.mount('#card-element');

    const baseUrl = `${window.location.protocol}//${window.location.host}/api/`;
    const endpoint = `carts/${cid}/purchase`;
    const url = `${baseUrl}${endpoint}`;

    const response = await fetch(url, {
      method: "post",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const { clientSecret } = await response.json();

      const result = await stripeClient.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });


      // Verifica el resultado del pago
      if (result.error) {
        // Maneja el error del pago
        console.error(result.error);
      } else {
        // El pago se realizó con éxito
        console.log(result.paymentIntent);
        // Realiza acciones adicionales si es necesario
      }
    } else {
      // Maneja el error de la solicitud al backend
      throw new Error('Error al procesar el pago');
    }
  } catch (error) {
    console.error('Error al procesar el pago:', error);
  }


}
