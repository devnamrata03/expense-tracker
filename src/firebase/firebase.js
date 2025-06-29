// src/firebase/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
  
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDQuv9cUw74gKjSRUpZ7bTk1f5zBd3AFcs",
  authDomain: "expense-tracker-8bad2.firebaseapp.com",
  projectId: "expense-tracker-8bad2",
  storageBucket: "expense-tracker-8bad2.firebasestorage.app",
  messagingSenderId: "737579662423",
  appId: "1:737579662423:web:27278cba7a07c3ffb53712",
  measurementId: "G-CPDPQ77QY1"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
