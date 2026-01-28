// js/cart.js — plain script (NO import/export)

function getCart() {
  return JSON.parse(localStorage.getItem("cart") || "[]");
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

window.addToCart = function (id, name, price) {
  const cart = getCart();
  const existing = cart.find((item) => item.id === id);

  if (existing) existing.quantity += 1;
  else cart.push({ id, name, price, quantity: 1 });

  saveCart(cart);
  console.log("✅ Added to cart:", { id, name, price });
};

window.removeFromCart = function (id) {
  const cart = getCart().filter((item) => item.id !== id);
  saveCart(cart);
  if (typeof window.renderCart === "function") window.renderCart();
};

window.renderCart = function () {
  const cart = getCart();
  const cartItemsEl = document.getElementById("cart-items");
  const cartTotalEl = document.getElementById("cart-total");

  if (!cartItemsEl || !cartTotalEl) return; // not on cart page

  if (cart.length === 0) {
    cartItemsEl.innerHTML = "<p>Your cart is empty.</p>";
    cartTotalEl.textContent = "";
    return;
  }

  let total = 0;

  cartItemsEl.innerHTML = cart
    .map((item) => {
      total += item.price * item.quantity;
      return `
        <div class="cart-row">
          <strong>${item.name}</strong><br>
          €${Number(item.price).toFixed(2)} × ${item.quantity}
          <button type="button" onclick="removeFromCart(${item.id})">Remove</button>
        </div>
      `;
    })
    .join("");

  cartTotalEl.textContent = `Total: €${total.toFixed(2)}`;
};
