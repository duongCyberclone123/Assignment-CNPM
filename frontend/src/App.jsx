import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'; 
import Login from './pages/login';
import StudentDashboard from './pages/StudentDashboard';
import SPSODashboard from './pages/SPSODashboard';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/spsodashboard" element={<SPSODashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
