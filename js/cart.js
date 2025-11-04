function addToCart(id, name, price) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const existing = cart.find(item => item.id === id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ id, name, price, quantity: 1 });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  alert(`${name} added to cart!`);
}

// Remove an item completely from the cart
function removeFromCart(id) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart = cart.filter(item => item.id !== id);
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
}

// Update the cart display (for cart.html)
function renderCart() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const container = document.getElementById('cart-items');
  const totalEl = document.getElementById('cart-total');

  container.innerHTML = '';

  let total = 0;
  cart.forEach(item => {
    const row = document.createElement('div');
    row.classList.add('cart-row');
    row.innerHTML = `
      ${item.name} (x${item.quantity}) — €${(item.price * item.quantity).toFixed(2)}
      <button onclick="removeFromCart(${item.id})">Remove</button>
    `;
    container.appendChild(row);
    total += item.price * item.quantity;
  });

  totalEl.textContent = `Total: €${total.toFixed(2)}`;
}