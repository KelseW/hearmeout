import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCDcfNyCQ3nrc4kn90Yi0bOVAwbuT-6C2k",
  authDomain: "hear-me-out-8c1af.firebaseapp.com",
  projectId: "hear-me-out-8c1af",
  storageBucket: "hear-me-out-8c1af.firebasestorage.app",
  messagingSenderId: "916354802966",
  appId: "1:916354802966:web:69f86425cf0568124e1c37"
};

// Initialize Firebase app
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Firestore
const db = getFirestore(app);

let auth;
try {
  // Initialize Firebase Authentication
  auth = getAuth(app);
} catch (e) {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
}

export { auth, db };