// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA60w72t95mZ6wNULiuQnG4Ufl_7wwTEiM",
    authDomain: "push-9bfc4.firebaseapp.com",
    projectId: "push-9bfc4",
    storageBucket: "push-9bfc4.appspot.com",
    messagingSenderId: "645986432",
    appId: "1:645986432:web:d8cb947e20d0999ed90e65",
    measurementId: "G-88101N6FWD"
  };

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
export default firebase;