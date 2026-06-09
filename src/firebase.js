// REPLACE THESE VALUES with your Firebase project config
// Found at: Firebase Console → Project Settings → Your apps → Web app → SDK setup

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyA3owUEyawNf14_WopgG0H8ziAAfRRvc04",
  authDomain: "predictor-5aside.firebaseapp.com",
  projectId: "predictor-5aside",
  storageBucket: "predictor-5aside.firebasestorage.app",
  messagingSenderId: "433207574934",
  appId: "1:433207574934:web:79d700433a772eac895db7"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export default app;
