// Randomly pick one shop version and save it in localStorage
function assignShopVersion() {
  let existing = localStorage.getItem('shopVersion');

  if (existing) {
    return existing; // 🔒 reuse existing version
  }

  const versions = [
  'awgxgqqnaen.html',   // sneak
  'bqfpmswwuof.html',   // nagging
  'crsvmfzjiif.html'    // control
  ];
  const chosen = versions[Math.floor(Math.random() * versions.length)];

  localStorage.setItem('shopVersion', chosen);
  return chosen;
}

// Retrieve the version (e.g., for logging or Firebase)
function getShopVersion() {
  return localStorage.getItem('shopVersion') || 'unknown';
}

// ✅ No exports needed when loaded via <script src=...>
window.assignShopVersion = assignShopVersion;
window.getShopVersion = getShopVersion;
