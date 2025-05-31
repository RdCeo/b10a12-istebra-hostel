// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBKnJPy3Qp-ggNKzlzY8y988l95gQ6L8Qg",
  authDomain: "istebra-hostel.firebaseapp.com",
  projectId: "istebra-hostel",
  storageBucket: "istebra-hostel.firebasestorage.app",
  messagingSenderId: "937520811740",
  appId: "1:937520811740:web:d661fdde3edad7f7b52e19"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;
