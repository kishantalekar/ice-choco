// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import { fireStore, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "Your api key",
  authDomain: "Your api key",
  projectId: "Your api key",
  storageBucket: "Your api key",
  messagingSenderId: "Your api key",
  appId: "Your api key",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);

export const db = getFirestore(app);
