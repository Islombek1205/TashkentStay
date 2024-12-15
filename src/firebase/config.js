import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyANDRs0aHufaoLqn-Hr2Zi7E1N0qqwgfOE",
  authDomain: "mexmonxonani-bron-qilish.firebaseapp.com",
  projectId: "mexmonxonani-bron-qilish",
  storageBucket: "mexmonxonani-bron-qilish.firebasestorage.app",
  messagingSenderId: "1064999491949",
  appId: "1:1064999491949:web:c69a331cf72c5ccc23a264",
  measurementId: "G-GDE4BM31DG"
};

// Firebase App-ini ishga tushurish
const app = initializeApp(firebaseConfig);

// Authentication va Firestore xizmatlarini olish
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, app };
