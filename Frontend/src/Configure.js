import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyDwi_W8rLQcKkpauYqok8IQMp4MfBfELzk",
    authDomain: "chatgpt-72604.firebaseapp.com",
    projectId: "chatgpt-72604",
    storageBucket: "chatgpt-72604.appspot.com",
    messagingSenderId: "1095498805400",
    appId: "1:1095498805400:web:9ca5c26622fcf83b86a0ed",
    measurementId: "G-7LJ8T15MZL"
};

const app = initializeApp(firebaseConfig, "app2");
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();