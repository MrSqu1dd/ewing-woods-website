import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAEVfU9MB8r9WgMhS4ZSvZBc9Tr0UKpLSk",
  authDomain: "ewing-woods-website.firebaseapp.com",
  projectId: "ewing-woods-website",
  storageBucket: "ewing-woods-website.firebasestorage.app",
  messagingSenderId: "270621483299",
  appId: "1:270621483299:web:ab86b7fa6863cad6dcac96"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
