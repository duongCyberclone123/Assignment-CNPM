import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'; 
import Login from './pages/login';
import StudentDashboard from './pages/StudentDashboard';
import SPSODashboard from './pages/SPSODashboard';
import ManagePrinter from './pages/ManagePrinter'
import HistoryLog from './pages/HistoryLog'
import SignUp from './pages/Signup'
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/spsodashboard" element={<SPSODashboard />} />
        <Route path="/manageprinter" element={<ManagePrinter />} />
        <Route path="/printhistory" element={<HistoryLog />} />
      </Routes>
    </Router>
  );
};

export default App;
