// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA6KKHheLDNEgLaW6SDof-9iSk31v7t2zY",
    authDomain: "vivinci-13181.firebaseapp.com",
    projectId: "vivinci-13181",
    storageBucket: "vivinci-13181.appspot.com",
    messagingSenderId: "1077817959195",
    appId: "1:1077817959195:web:726bffe458037aacd1e9be"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)


