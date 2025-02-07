// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDwRSHBzo7Yq4HzJnjfyQSbI3wf3wE6Fa0",
  authDomain: "tickekaki.firebaseapp.com",
  projectId: "tickekaki",
  storageBucket: "tickekaki.firebasestorage.app",
  messagingSenderId: "265979786192",
  appId: "1:265979786192:web:24e754c0dcaff0c4773fd5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Firestore instance

export { app, db };
