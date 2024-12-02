import React from 'react';
import { BrowserRouter as Router, Routes, Route ,Outlet,Navigate} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/login';
import SPSODashboard from './pages/SPSODashboard';
import History from './pages/student/history';
import Print from './pages/student/print';
import PrintPurchasePage from './pages/student/purchase';
import ManagePrinter from './pages/ManagePrinter';
import SignUp from './pages/Signup';
import HistoryLog from './pages/HistoryLog'

const StudentRole = () => {
  const isAuthenticated = localStorage.getItem('token');
  const studentID = JSON.parse(localStorage.getItem('userData')).ID;
  if (isAuthenticated && (studentID > 0 && studentID < 2000)) {
    return <Navigate to="/spsodashboard" />;
  }
  else if (!isAuthenticated || (studentID > 0 && studentID < 2000)) {
    return <Navigate to="/" />;
  }
  
  return <Outlet />;
};
const SPSORole = () => {
  const isAuthenticated = localStorage.getItem('token');
  const studentID = JSON.parse(localStorage.getItem('userData')).ID;
  if (isAuthenticated && (studentID >= 2000 && studentID <= 5000)) {
    return <Navigate to="/home" />;
  }
  else if (!isAuthenticated || (studentID >= 2000 && studentID <= 5000)) {
    return <Navigate to="/" />;
  }
  
  return <Outlet />;
};

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />

        {/* Private Routes */}
        <Route element={<SPSORole />}>
          <Route path="/spsodashboard" element={<SPSODashboard />} />
          <Route path="/manageprinter" element={<ManagePrinter />} />
          <Route path="/printhistory" element={<HistoryLog />} />
        </Route>
        <Route element={<StudentRole />}>
          <Route path="/home" element={<Home />} />
          <Route path="/history" element={<History />} />
          <Route path="/print" element={<Print />} />
          <Route path="/purchase" element={<PrintPurchasePage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
