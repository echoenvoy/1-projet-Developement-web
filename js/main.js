const container = document.getElementById("products-container");
const pagination = document.getElementById("pagination");
const cartCount = document.getElementById("cart-count");
const searchInput = document.getElementById("search-input");

let currentPage = 1;
const limit = 9;
let allProducts = [];

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  cartCount.textContent = totalItems;
}

async function fetchProducts() {
  const res = await fetch(`https://dummyjson.com/products?limit=100`);
  const data = await res.json();
  allProducts = data.products;
  renderPage(1);
  createPagination(allProducts.length);
}

function renderPage(page) {
  currentPage = page;
  const start = (page - 1) * limit;
  const currentProducts = filteredProducts().slice(start, start + limit);
  displayProducts(currentProducts);
}

function displayProducts(products) {
  container.innerHTML = '';
  if (products.length === 0) {
    container.innerHTML = `<p class="text-center">Aucun produit trouvé.</p>`;
    return;
  }

  products.forEach(product => {
    container.innerHTML += `
      <div class="col-md-4 mb-4">
        <div class="card h-100">
        
          <a href="product.html?id=${product.id}">
            <img src="${product.thumbnail}" class="card-img-top" alt="${product.title}">
          </a>

          <div class="card-body d-flex flex-column">

            <a href="product.html?id=${product.id}" class="text-decoration-none text-dark">
                <h5 class="card-title">${product.title}</h5>
            </a>

            <p class="card-text text-muted">${product.description.substring(0, 60)}...</p>
            <div class="mt-auto d-flex justify-content-between align-items-center">
              <span class="fw-bold">${product.price} $</span>
              <button id="add-btn-${product.id}" class="btn btn-primary btn-sm" onclick="addToCart(${product.id})">Ajouter</button>

            </div>
          </div>
        </div>
      </div>
    `;
  });
}

function createPagination(total) {
  const totalPages = Math.ceil(total / limit);
  pagination.innerHTML = '';
  for (let i = 1; i <= totalPages; i++) {
    pagination.innerHTML += `
      <button class="btn ${i === currentPage ? 'btn-primary' : 'btn-outline-primary'} mx-1" onclick="renderPage(${i})">${i}</button>
    `;
  }
}

function filteredProducts() {
  const keyword = searchInput.value.toLowerCase();
  return allProducts.filter(p =>
    p.title.toLowerCase().includes(keyword) ||
    p.description.toLowerCase().includes(keyword)
  );
}

searchInput.addEventListener("input", () => {
  renderPage(1);
  createPagination(filteredProducts().length);
});

function addToCart(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const product = allProducts.find(p => p.id === id);
  const existing = cart.find(item => item.id === id);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  alert("Produit ajouté !");

  const btn = document.getElementById(`add-btn-${id}`);
if (btn) {
  btn.textContent = "Ajouté";
  btn.classList.remove("btn-primary");
  btn.classList.add("btn-success");
  btn.disabled = true;
}

}

updateCartCount();
fetchProducts();
