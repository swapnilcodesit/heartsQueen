// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, getAuth } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAo_aAQSlTnSC8x8kqBsqfX9fXlrzroz7U",
  authDomain: "heartsqueen-2c296.firebaseapp.com",
  projectId: "heartsqueen-2c296",
  storageBucket: "heartsqueen-2c296.firebasestorage.app",
  messagingSenderId: "297676404538",
  appId: "1:297676404538:web:4869368e76ea402cf5c203",
  measurementId: "G-JTFXP5X7GG",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export const auth = getAuth();
export default app;
