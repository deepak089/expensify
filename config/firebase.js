// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
import {getFirestore, collection} from 'firebase/firestore'
import { getAuth} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDGIf1j7FpdmUBBak6lC7nGSjGOQY9DWBU",
  authDomain: "expensify-yt.firebaseapp.com",
  projectId: "expensify-yt",
  storageBucket: "expensify-yt.appspot.com",
  messagingSenderId: "105788715951",
  appId: "1:105788715951:web:73f160124a0d888336755a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db=getFirestore(app);
export const auth=getAuth(app);

export const tripRef=collection(db,'trips')
export const expenseRef=collection(db,'expenses')

export default app;
