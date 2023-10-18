// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCkfJeQmQZWKr3DKCHk5TvKExW_nwV4OGw",
  authDomain: "react-journal-71c1d.firebaseapp.com",
  projectId: "react-journal-71c1d",
  storageBucket: "react-journal-71c1d.appspot.com",
  messagingSenderId: "252691852988",
  appId: "1:252691852988:web:eea6a4de84254fe31b6ab9"
};

// Initialize Firebase
export const FirebaseApp  = initializeApp(firebaseConfig);
export const fireBaseAuth = getAuth( FirebaseApp );
export const firebaseDB   = getFirestore( FirebaseApp )