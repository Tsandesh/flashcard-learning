// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";

import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAYM9vXJTGcxo-8Usstvmdj0rCOZUWxIBs",
  authDomain: "flashcard-a1366.firebaseapp.com",
  projectId: "flashcard-a1366",
  storageBucket: "flashcard-a1366.appspot.com",
  messagingSenderId: "669320256057",
  appId: "1:669320256057:web:3ae7d704c3de5f1f52cbe8",
  databaseURL: "https://flashcard-a1366-default-rtdb.firebaseio.com/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const db = getDatabase(app);
const db = getFirestore(app);

const auth = getAuth(app);

export { auth, db };
