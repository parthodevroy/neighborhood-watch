// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAhTxx18no1bRjHMgLzcLRaBJEKNmFJcYk",
  authDomain: "neighborhood-watch-37844.firebaseapp.com",
  projectId: "neighborhood-watch-37844",
  storageBucket: "neighborhood-watch-37844.firebasestorage.app",
  messagingSenderId: "311801583831",
  appId: "1:311801583831:web:fb7ec0a7377e14a551b892"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);