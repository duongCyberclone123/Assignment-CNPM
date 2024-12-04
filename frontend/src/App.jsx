import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'; 
import Login from './pages/login';
import StudentDashboard from './pages/StudentDashboard';
import SPSODashboard from './pages/SPSODashboard';
import ManagePrinter from './pages/ManagePrinter'
import SPSOHistoryLog from './pages/SPSOHistoryLog'
import SignUp from './pages/Signup'
import History from './pages/student/history';
import Print from './pages/student/print';
import PrintPurchasePage from './pages/student/purchase';
import Report from './pages/Report'
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
        <Route path="/spsohistory" element={<SPSOHistoryLog />} />
        <Route path="/history" element={<History />} />
        <Route path="/print" element={<Print />} />
        <Route path="/purchase" element={<PrintPurchasePage />} />
        <Route path="/report" element={<Report />} />
      </Routes>
    </Router>
  );
};

export default App;
