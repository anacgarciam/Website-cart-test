// js/cart.js — plain script (NO import/export)

function getCart() {
  return JSON.parse(localStorage.getItem("cart") || "[]");
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

window.addToCart = function (id, name, price, image) {
  const cart = getCart();
  const existing = cart.find((item) => Number(item.id) === Number(id));

  const BOOT_IDS = [1, 2, 3];
  const currentVersion = localStorage.getItem("shopVersion");
  const sneakVersionActive = currentVersion === "awgxgqqnaen.html";
  const isBoot = BOOT_IDS.includes(Number(id)) && sneakVersionActive;

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
      id,
      name,
      price,
      image,
      quantity: 1,

      // New fields for V2 only
      waterproofingSelected: isBoot,
      waterproofingPrice: isBoot ? 12.99 : 0
    });
  }

  saveCart(cart);
  window.updateHeaderCart?.();
  if (typeof window.renderCart === "function") window.renderCart();
};

window.updateWaterproofing = function (id, selectedValue) {
  const currentVersion = localStorage.getItem("shopVersion");
  if (currentVersion !== "awgxgqqnaen.html") return;
  const cart = getCart();
  const item = cart.find((i) => Number(i.id) === Number(id));

  if (!item) return;

  item.waterproofingSelected = selectedValue === "yes";
  item.waterproofingPrice = item.waterproofingSelected ? 12.99 : 0;

  saveCart(cart);
  window.updateHeaderCart?.();
  if (typeof window.renderCart === "function") window.renderCart();
};

window.removeFromCart = function (id) {
  const cart = getCart().filter((item) => item.id !== id);
  saveCart(cart);
  window.updateHeaderCart?.();
  window.updateCheckoutState?.();
  window.renderCart?.();
};

window.decreaseQty = function (id) {
  const cart = getCart();
  const item = cart.find(i => i.id === id);
  if (!item) return;

  item.quantity -= 1;
  if (item.quantity <= 0) {
    // remove item if it hits 0
    const idx = cart.findIndex(i => i.id === id);
    cart.splice(idx, 1);
  }

  saveCart(cart);
  window.updateHeaderCart?.();
  window.updateCheckoutState?.();
  window.renderCart?.();
};

window.increaseQty = function (id) {
  const cart = getCart();
  const item = cart.find(i => i.id === id);
  if (!item) return;

  item.quantity += 1;

  saveCart(cart);
  window.updateHeaderCart?.();
  window.updateCheckoutState?.();
  window.renderCart?.();
};


window.renderCart = function () {
  const cart = getCart();
  const cartItemsEl = document.getElementById("cart-items");
  const cartTotalEl = document.getElementById("cart-total");

  if (!cartItemsEl || !cartTotalEl) return; // not on cart page

  if (cart.length === 0) {
    const version = localStorage.getItem("shopVersion");

    cartItemsEl.innerHTML = `
      <div class="empty-cart">
        <p>Your cart is empty.</p>
        <a class="top-link" href="${version ? `versions/${version}` : 'index.html'}">
          ← Continue shopping
        </a>
      </div>
    `;

    cartTotalEl.textContent = "";
    return;
  }

  let total = 0;

  cartItemsEl.innerHTML = cart
    .map((item) => {
      const waterproofingTotal =
        item.waterproofingSelected ? (item.waterproofingPrice || 0) * item.quantity : 0;

      total += item.price * item.quantity + waterproofingTotal;
      const imgHtml = item.image
        ? `<img class="cart-thumb" src="${item.image}" alt="${item.name}">`
        : "";

      const BOOT_IDS = [1, 2, 3];
      const currentVersion = localStorage.getItem("shopVersion");
      const sneakVersionActive = currentVersion === "awgxgqqnaen.html";
      const isBoot = BOOT_IDS.includes(Number(item.id)) && sneakVersionActive;

      const waterproofingHtml = isBoot
        ? `
          <div class="waterproofing-option">
            <label for="wp-${item.id}">Waterproofing:</label>
            <select id="wp-${item.id}" onchange="updateWaterproofing(${item.id}, this.value)">
              <option value="yes" ${item.waterproofingSelected ? "selected" : ""}>
                Included (+€12.99)
              </option>
              <option value="no" ${!item.waterproofingSelected ? "selected" : ""}>
                No waterproofing (+€0.00)
              </option>
            </select>
          </div>
        `
        : "";

      const lineTotal =
        item.price * item.quantity +
        (item.waterproofingSelected ? (item.waterproofingPrice || 0) * item.quantity : 0);

      return `
        <div class="cart-row">
          ${imgHtml}

          <div class="cart-row-left">
            <div class="cart-name">${item.name}</div>
            <div class="cart-meta">€${Number(item.price).toFixed(2)} each</div>
            ${waterproofingHtml}
          </div>

          <div class="cart-row-right">
            <div class="qty">
              <button type="button" class="qty-btn" onclick="decreaseQty(${item.id})">−</button>
              <span class="qty-num">${item.quantity}</span>
              <button type="button" class="qty-btn" onclick="increaseQty(${item.id})">+</button>
            </div>

            <div class="line-total">€${lineTotal.toFixed(2)}</div>

            <button type="button" class="remove-btn" onclick="removeFromCart(${item.id})">
              Remove
            </button>
          </div>
        </div>
      `;
    })
    .join("");

  cartTotalEl.textContent = `Total: €${total.toFixed(2)}`;
};

window.updateHeaderCart = function () {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");

  const itemCount = cart.reduce((sum, item) => sum + (Number(item.quantity) || 0), 0);
  const total = cart.reduce((sum, item) => {
    const base = (Number(item.price) || 0) * (Number(item.quantity) || 0);
    const waterproofing =
      item.waterproofingSelected
        ? (Number(item.waterproofingPrice) || 0) * (Number(item.quantity) || 0)
        : 0;

    return sum + base + waterproofing;
  }, 0);

  const countEl = document.getElementById("cartCount");
  const totalEl = document.getElementById("cartHeaderTotal");
  const cartLinkEl = document.querySelector(".cart-link");

  if (countEl) {
    countEl.textContent = String(itemCount);
    countEl.style.display = itemCount > 0 ? "inline-flex" : "none";
  }

  if (totalEl) {
    totalEl.textContent = itemCount > 0 ? `€${total.toFixed(2)}` : "€0.00";
  }

  if (cartLinkEl) {
    cartLinkEl.classList.toggle("has-items", itemCount > 0);
    cartLinkEl.setAttribute(
      "aria-label",
      itemCount > 0
        ? `Cart with ${itemCount} items, total €${total.toFixed(2)}`
        : "Cart is empty"
    );
    // optional little "pop" animation
    cartLinkEl.classList.remove("cart-bump");
    void cartLinkEl.offsetWidth;
    cartLinkEl.classList.add("cart-bump");
  }
};
