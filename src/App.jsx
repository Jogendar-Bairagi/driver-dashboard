import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import AdminLogin from "./Components/AdminLogin";
import AdminDashboard from "./Components/AdminDashboard";
import DriverLogin from "./Components/DriverLogin";
import  DriverDashboardOne from "./Components/DriverDashboardOne";
import PassengerLogin from "./Components/PassengerLogin";
import {getDatabase, ref, set} from "firebase/database";
import {app} from "./firebase";
import ProtectedRoute from "./ProtectedRoute";
import PassengerDashboardOne from "./Components/PassengerDashboardOne";
import DriverDashboardTwo from "./Components/DriverDashboardTwo";
import Bus1 from "./Components/Bus1";
import Bus2 from "./Components/Bus2";

const db = getDatabase(app);

function App() {
  return (
    <>
   <Routes>
    <Route path="/" element={<Home />} />
    <Route path="*" element={<h2>Page Not Found</h2>} />
    <Route path="/admin-login" element={<AdminLogin />} />
    <Route path="/admin-dashboard" element={<ProtectedRoute requiredEmail="admin@gmail.com"><AdminDashboard /></ProtectedRoute>} />
    <Route path="/passenger-login" element={<PassengerLogin />} />
    <Route path="/driver-login" element={<DriverLogin />} />
    <Route path="/driver-dashboard-one" element={<ProtectedRoute requiredEmail="driver1@gmail.com"><DriverDashboardOne /></ProtectedRoute>} />
    <Route path="/driver-dashboard-two" element={<ProtectedRoute requiredEmail="driver2@gmail.com"><DriverDashboardTwo /></ProtectedRoute>} />    
    <Route path="/passenger-dashboard-one" element={<PassengerDashboardOne />} />
    <Route path="/bus1"  element={ <ProtectedRoute>  <Bus1 /> </ProtectedRoute>} />
    <Route path="/bus2"  element={ <ProtectedRoute>  <Bus2 /> </ProtectedRoute> }/>

    </Routes>
    </>
  );
}

export default App;
