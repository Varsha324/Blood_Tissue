import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import AddDonor from "./components/AddDonor";
import Recipient from "./components/Recipient";
import "./App.css";  
import RecipientStatus from "./components/RecipientStatus";
import DonorStatus from "./components/DonorStatus";
import DashboardAdmin from "./components/DashboardAdmin";
import DonarVerification from "./components/DonarVerification";
import RecipientVerification from "./components/RecipientVerification";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-donor" element={<AddDonor />} />
        <Route path="/Recipient" element={<Recipient />} />
        <Route path="/RecipientStatus" element={<RecipientStatus/>}/>
        <Route path="/DonorStatus" element={<DonorStatus/>}/>
        <Route path="/dashboard-admin" element={<DashboardAdmin/>}/>
        <Route path="/donar-verification" element = {<DonarVerification/>}/>
        <Route path="/recipient-verification" element = {<RecipientVerification/>}/>
      </Routes>
    </Router>
  );
}

export default App;