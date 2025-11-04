// Helper: Get current cart from localStorage (or start empty)
function getCart() {
  return JSON.parse(localStorage.getItem('cart')) || [];
}

// Helper: Save cart to localStorage
function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Add event listener to all "Add to Cart" buttons
document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', () => {
    const productElement = button.parentElement;
    const name = productElement.querySelector('.product-name').textContent;
    const price = parseFloat(productElement.querySelector('.product-price').dataset.price);

    const cart = getCart();

    // Check if product already in cart
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ name, price, quantity: 1 });
    }

    saveCart(cart);
    alert(`${name} added to cart!`);
  });
});