// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC6n4VVW86h6BdQF4Ud8gv7pJ0ZDE4jpQ4",
  authDomain: "e-commerce-63aee.firebaseapp.com",
  projectId: "e-commerce-63aee",
  storageBucket: "e-commerce-63aee.appspot.com",
  messagingSenderId: "388241752401",
  appId: "1:388241752401:web:d79ba647fc49abd0ec5370",
  measurementId: "G-613QV5C1ZD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { auth, provider };
