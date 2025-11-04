// Randomly pick one shop version and save it in localStorage
function assignShopVersion() {
  const versions = ['shopA.html', 'shopB.html', 'shopC.html', 'shopD.html'];
  const chosen = versions[Math.floor(Math.random() * versions.length)];
  localStorage.setItem('shopVersion', chosen);
  return chosen;
}

// Retrieve the version (e.g., for logging or Firebase)
function getShopVersion() {
  return localStorage.getItem('shopVersion') || 'unknown';
}

// Export (only needed if using ES Modules)
export { assignShopVersion, getShopVersion };