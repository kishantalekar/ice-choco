// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import { fireStore, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDX_QroZy5MkUjjnlwy0bWn0LtbziIyQGw",
  authDomain: "laundry-app-af8f7.firebaseapp.com",
  projectId: "laundry-app-af8f7",
  storageBucket: "laundry-app-af8f7.appspot.com",
  messagingSenderId: "249066700984",
  appId: "1:249066700984:web:bfa12455d5e3ea2ada344d",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);

export const db = getFirestore(app);
