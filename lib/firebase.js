// lib/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GithubAuthProvider } from 'firebase/auth';

// Firebase configuration object from Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyBAlyrGXyGx191ikyEBVUuVMUirRKCGwHI",
  authDomain: "moviedatabase-56f2e.firebaseapp.com",
  projectId: "moviedatabase-56f2e",
  storageBucket: "moviedatabase-56f2e.firebasestorage.app",
  messagingSenderId: "196596308553",
  appId: "1:196596308553:web:8b66ce60b77fb6f1f43d98"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get the Firebase Auth instance
const auth = getAuth(app);

// Export the necessary Firebase functions
export { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GithubAuthProvider };
