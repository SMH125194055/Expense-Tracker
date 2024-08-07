// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC7GT082esZzuEAs4HjVJGZ3rWIVhxmPy0",
  authDomain: "expense-tracker-37ac6.firebaseapp.com",
  projectId: "expense-tracker-37ac6",
  storageBucket: "expense-tracker-37ac6.appspot.com",
  messagingSenderId: "708858301670",
  appId: "1:708858301670:web:cac8dc193508a85f227f27"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export { db };