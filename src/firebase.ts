import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_KEY,
    authDomain: "realtime-chat-f9972.firebaseapp.com",
    projectId: "realtime-chat-f9972",
    storageBucket: "realtime-chat-f9972.appspot.com",
    messagingSenderId: "670747198835",
    appId: "1:670747198835:web:f092971d174e743687f106"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
