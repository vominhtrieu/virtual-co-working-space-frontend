import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAlYUcwWTOpsg3yTGC2tEl6ufl_GUQoOfo",
  authDomain: "vispace-ed2ac.firebaseapp.com",
  projectId: "vispace-ed2ac",
  storageBucket: "vispace-ed2ac.appspot.com",
  messagingSenderId: "351864430510",
  appId: "1:351864430510:web:0bd27b05c1f74b5db4323f"
};

// Initialize Firebase
const FirebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(FirebaseApp);
export default firebaseConfig;