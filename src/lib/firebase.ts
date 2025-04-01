// src/lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";

// Firebase config from your Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyBJZDx0ROusH0yRkviL2fdf21ST3aCeSt4",
  authDomain: "bitleaf-3fed6.firebaseapp.com",
  databaseURL: "https://bitleaf-3fed6-default-rtdb.firebaseio.com",
  projectId: "bitleaf-3fed6",
  storageBucket: "bitleaf-3fed6.firebasestorage.app",
  messagingSenderId: "1082308873611",
  appId: "1:1082308873611:web:aa9788720715fc1c58b38e",
  measurementId: "G-MLFCR5YRVJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Export what you need to use elsewhere
export { database, ref, onValue };