import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyA_MdMvYBZUNF_NxnY40TSCAQ3r4b4nRpg",
  authDomain: "ddbms-91a81.firebaseapp.com",
  projectId: "ddbms-91a81",
  storageBucket: "ddbms-91a81.appspot.com",
  messagingSenderId: "559226980721",
  appId: "1:559226980721:web:9f27303ff3f02ad4988ed0",
  measurementId: "G-ES9KLNPBQX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
export const db = getFirestore(app);

export default app;