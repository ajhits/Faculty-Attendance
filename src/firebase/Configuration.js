// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import { getStorage  } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAFfT2IDTJN8ZvuBT521G5wlmhy2OxFzVk",
  authDomain: "aiot-knows-me.firebaseapp.com",
  databaseURL: "https://aiot-knows-me-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "aiot-knows-me",
  storageBucket: "aiot-knows-me.appspot.com",
  messagingSenderId: "361882919399",
  appId: "1:361882919399:web:ef48ca59ff3bcddda59d42"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// for firebase authentication
export const auth = getAuth(app);

// for firebase storage
export const storage = getStorage();

// for fire store database
export const firestore = getFirestore(app);

// for realtime database
export const database = getDatabase(app);