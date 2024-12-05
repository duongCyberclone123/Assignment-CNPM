import React from 'react';
import { BrowserRouter as Router, Routes, Route ,Outlet,Navigate} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/login';
import StudentDashboard from './pages/StudentDashboard'
import SPSODashboard from './pages/SPSODashboard';
import ManagePrinter from './pages/ManagePrinter'
import SPSOHistoryLog from './pages/SPSOHistoryLog'
import Print from './pages/student/print';
import PrintPurchasePage from './pages/student/purchase';
import Report from './pages/Report'
import History from './pages/student/history';
import SignUp from './pages/Signup';

const StudentRole = () => {
  const isAuthenticated = localStorage.getItem('token');
  const spsoID = JSON.parse(localStorage.getItem('userData')).ID;
  if (isAuthenticated && (spsoID >=1 && spsoID <=1999)) {
    return <Navigate to="/spsodashboard" />;
  }
  else if (!isAuthenticated) {
    return <Navigate to="/" />;
  }
  
  return <Outlet />;
};
const SPSORole = () => {
  const isAuthenticated = localStorage.getItem('token');
  const studentID = JSON.parse(localStorage.getItem('userData')).ID;
  if (isAuthenticated && (studentID >= 2000 && studentID <= 5000)) {
    return <Navigate to="/student-dashboard" />;
  }
  else if (!isAuthenticated) {
    return <Navigate to="/" />;
  }
  
  return <Outlet />;
};

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<Home />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/login" element={<Login />} />

        {/* Private Routes */}
        <Route element={<SPSORole />}>
          <Route path="/spsodashboard" element={<SPSODashboard />} />
          <Route path="/manageprinter" element={<ManagePrinter />} />
          <Route path="/spsohistory" element={<SPSOHistoryLog />} />
          <Route path="/report" element={<Report />} />

        </Route>
        <Route element={<StudentRole />}>
          <Route path="/student-dashboard" element={<StudentDashboard />} />
          <Route path="/history" element={<History />} />
          <Route path="/print" element={<Print />} />
          <Route path="/purchase" element={<PrintPurchasePage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
