// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';  // Import Firebase Auth
import { getFirestore } from "firebase/firestore";

// Your Firebase config (using the values you provided)
const firebaseConfig = {
  apiKey: 'AIzaSyCUOLUl2Sh-xXYxNsCGYSnCsZwUJv6EAtI',
  authDomain: 'to-do-list-dc87f.firebaseapp.com',
  projectId: 'to-do-list-dc87f',
  storageBucket: 'to-do-list-dc87f.firebasestorage.app',
  messagingSenderId: '268506876898',
  appId: '1:268506876898:web:ac73e547cad3ef14cc47bb',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(app);

export { auth };  // Export the auth object for use in Login.js
