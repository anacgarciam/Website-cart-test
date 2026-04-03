function buildHeader() {
  const isInVersions = window.location.pathname.includes("/versions/");
  const base = isInVersions ? "../" : "";

  const currentVersion = localStorage.getItem("shopVersion");
  const logoHref = currentVersion
    ? (isInVersions ? currentVersion : "versions/" + currentVersion)
    : base + "index.html";

  return `
    <header class="site-header">
      <a id="logoLink" class="brand" href="${logoHref}">
        <img src="${base}media/logo/public-domain-vectors-weoy0jlwQcU-unsplash.svg" alt="Shop logo" class="brand-logo">
        <span class="brand-name">Trail & Co.</span>
      </a>

      <nav class="nav">


        <a href="${base}cart.html" class="nav-link cart-link" aria-label="Cart">
          <span class="cart-icon" aria-hidden="true">🛒</span>
          <span class="cart-text">Cart</span>
          <span class="cart-badge" id="cartCount">0</span>
          <span class="cart-total" id="cartHeaderTotal">€0.00</span>
        </a>
      </nav>
    </header>
  `;
}

window.insertHeader = function () {
  document.body.insertAdjacentHTML("afterbegin", buildHeader());
  window.updateHeaderCart?.();
};