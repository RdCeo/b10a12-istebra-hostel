// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCJyInPVHlcSzPSXWh8z0zzQVu4ye3qHzY",
  authDomain: "service-sphere-43a90.firebaseapp.com",
  projectId: "service-sphere-43a90",
  storageBucket: "service-sphere-43a90.appspot.com", // Fixed storage bucket URL
  messagingSenderId: "349912790257",
  appId: "1:349912790257:web:4453305e9d1fbf9d13e550"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;
