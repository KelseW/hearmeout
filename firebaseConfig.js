// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCDcfNyCQ3nrc4kn90Yi0bOVAwbuT-6C2k",
    authDomain: "hear-me-out-8c1af.firebaseapp.com",
    projectId: "hear-me-out-8c1af",
    storageBucket: "hear-me-out-8c1af.firebasestorage.app",
    messagingSenderId: "916354802966",
    appId: "1:916354802966:web:0f8f03ab2484867e4e1c37"
  };
  

// Initialise Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };