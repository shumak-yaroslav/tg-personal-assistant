import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDGp9dAzwStYpW2ASZYvRkP9zcRfYNYuz8",
    authDomain: "tg-personal-assistant.firebaseapp.com",
    projectId: "tg-personal-assistant",
    storageBucket: "tg-personal-assistant.firebasestorage.app",
    messagingSenderId: "352279668043",
    appId: "1:352279668043:web:c799c763e10b39c60a34ce",
    measurementId: "G-6RVGGK03P3"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
