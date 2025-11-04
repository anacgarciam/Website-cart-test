// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js";

// Your Firebase config snippet (from Firebase console)
const firebaseConfig = {
    apiKey: "AIzaSyD4pDzJGGCP2NHYuTPCv7nXS9Lx3UWPpJs",
    authDomain: "shop-experiment-f61ed.firebaseapp.com",
    projectId: "shop-experiment-f61ed",
    storageBucket: "shop-experiment-f61ed.firebasestorage.app",
    messagingSenderId: "158247201341",
    appId: "1:158247201341:web:04c24dde5cbeab19db1854"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Export for use in other scripts
export { db };