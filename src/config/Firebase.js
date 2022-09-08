// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCqKUgGPFiBOSQPyaH3pmvjJ1u9vQvlQQE",
  authDomain: "matesol-1027.firebaseapp.com",
  projectId: "matesol-1027",
  storageBucket: "matesol-1027.appspot.com",
  messagingSenderId: "498182719648",
  appId: "1:498182719648:web:fcbfce817f104899dfa1c5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export{app , auth ,db}