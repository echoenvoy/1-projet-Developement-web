const cartContainer = document.getElementById("cart-items");
const totalDisplay = document.getElementById("total");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function updateCartCount() {
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  const badge = document.getElementById("cart-count");
  if (badge) badge.textContent = totalItems;
}

function loadCart() {
  cartContainer.innerHTML = '';
  let total = 0;

  if (cart.length === 0) {
    cartContainer.innerHTML = `<p class="text-center">Votre panier est vide.</p>`;
    totalDisplay.textContent = '0';
    return;
  }

  for (let product of cart) {
    total += product.price * product.qty;

    cartContainer.innerHTML += `
      <div class="col-md-4 mb-4">
        <div class="card h-100">
          <img src="${product.thumbnail}" class="card-img-top">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">${product.title}</h5>
            <p class="card-text">${product.price} $ × ${product.qty}</p>
            <button class="btn btn-danger mt-auto" onclick="removeFromCart(${product.id})">Supprimer</button>
          </div>
        </div>
      </div>
    `;
  }

  totalDisplay.textContent = total.toFixed(2);
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  loadCart();
}

function clearCart() {
  if (confirm("Voulez-vous vraiment vider le panier ?")) {
    localStorage.removeItem("cart");
    cart = [];
    updateCartCount();
    loadCart();
  }
}

updateCartCount();
loadCart();
