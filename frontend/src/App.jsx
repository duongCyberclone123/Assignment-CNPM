import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'; 
import Login from './pages/login';
import StudentDashboard from './pages/StudentDashboard';
import SPSODashboard from './pages/SPSODashboard';
import ManagePrinter from './pages/ManagePrinter'
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/spsodashboard" element={<SPSODashboard />} />
        <Route path="/manageprinter" element={<ManagePrinter />} />
      </Routes>
    </Router>
  );
};

export default App;
