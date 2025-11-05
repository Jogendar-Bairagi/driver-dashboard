import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { data } from "react-router-dom";
import { getDatabase } from "firebase/database";
const firebaseConfig = {
  apiKey: "AIzaSyAsoiPdIrDA3M-xVpUjxPdoKed4BiaePF8",
  authDomain: "bus-tracker-229b6.firebaseapp.com",
  projectId: "bus-tracker-229b6",
  storageBucket: "bus-tracker-229b6.firebasestorage.app",
  messagingSenderId: "1000838322125",
  appId: "1:1000838322125:web:00336b3b5dd6926720d684",
  databaseURL: "https://bus-tracker-229b6-default-rtdb.firebaseio.com",
};
export const db = getDatabase(initializeApp(firebaseConfig));
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
