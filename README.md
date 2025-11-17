🚍 Real-Time Local Area Bus Tracking System

Live Demo - https://driver-dashboard-six.vercel.app/
password - 1234567

A full-stack real-time bus tracking system designed for local routes, built using React, Firebase Realtime Database, Leaflet Maps, and Geolocation API.
This system includes:

Driver App – Sends live GPS location to Firebase

Passenger App – Fetches location from Firebase and shows bus movement on map

⭐ Features
🔵 Driver Dashboard

Real-time GPS tracking using browser/mobile GPS
Automatically updates latitude & longitude every few seconds
Trip Start/Stop functionality
Location stored in Firebase Realtime Database
Simple UI optimized for mobile devices

🟢 Passenger Dashboard
Shows live bus location on map
Updates automatically using Firebase listeners
Uses Leaflet + OpenStreetMap tiles
Route map and live marker updates

⚙️ How It Works
Driver Side
Driver opens the Driver App page
Allows GPS permission
When “Start Trip” is pressed →
GPS coordinates start sending to Firebase
Passenger instantly sees the updated location

Passenger Side
Passenger opens Passenger App page
Map renders with bus marker
Bus location updates in real time using Firebase listeners

🔧 Setup Instructions
1️⃣ Clone the Repository
git clone https://github.com/your-username/local-bus-tracking.git
cd local-bus-tracking

2️⃣ Install Dependencies
npm install

3️⃣ Configure Firebase
Create firebase.js:

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "YOUR_KEY",
  authDomain: "YOUR_DOMAIN",
  databaseURL: "YOUR_DB_URL",
  projectId: "YOUR_ID",
  storageBucket: "YOUR_BUCKET",
  messagingSenderId: "YOUR_MSG",
  appId: "YOUR_APP"
};

export const app = initializeApp(firebaseConfig);

4️⃣ Start Development Server
npm run dev
