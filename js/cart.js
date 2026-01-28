function getCart() {
  return JSON.parse(localStorage.getItem("cart") || "[]");
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

window.addToCart = function (id, name, price) {
  const cart = getCart();
  const existing = cart.find(item => item.id === id);

  if (existing) existing.quantity += 1;
  else cart.push({ id, name, price, quantity: 1 });

  saveCart(cart);
  console.log("Added:", { id, name, price });
};

window.removeFromCart = function (id) {
  const cart = getCart().filter(item => item.id !== id);
  saveCart(cart);
};

window.clearCart = function () {
  localStorage.removeItem("cart");
};
