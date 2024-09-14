// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


const firebaseConfig = {
  apiKey: "AIzaSyA0yMfeAm0klBpnpJBqyyqd_CRiD_dITyc",
  authDomain: "learningkids-5cc76.firebaseapp.com",
  databaseURL: "https://learningkids-5cc76-default-rtdb.firebaseio.com",
  projectId: "learningkids-5cc76",
  storageBucket: "learningkids-5cc76.appspot.com",
  messagingSenderId: "564771687218",
  appId: "1:564771687218:web:779548c7c3b40a6f56252b",
  measurementId: "G-VJSGV41ZSD"
};

const app = initializeApp(firebaseConfig);
//const auth = getAuth(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const database = getDatabase(app);