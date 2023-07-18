// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDT9mHoCcVZpUdnkz4uxa27yBVzCrDIBKc",
  authDomain: "bookai-9f445.firebaseapp.com",
  projectId: "bookai-9f445",
  storageBucket: "bookai-9f445.appspot.com",
  messagingSenderId: "747676003983",
  appId: "1:747676003983:web:0e1ffc38671d4d36a44afa",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const db = getFirestore(app);
export default db;
console.log("Firebase initialized");
