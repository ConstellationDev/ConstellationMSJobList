// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCVs9LHzCtDTO7x95jPYBjd1wrQ7xzNDSE",
  authDomain: "cms-job-list.firebaseapp.com",
  projectId: "cms-job-list",
  storageBucket: "cms-job-list.firebasestorage.app",
  messagingSenderId: "834025770858",
  appId: "1:834025770858:web:3b88ffd13a3746a9e6df13"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);