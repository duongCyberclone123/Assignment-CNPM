import React from 'react';
import { BrowserRouter as Router, Routes, Route ,Outlet,Navigate} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/login';
import StudentDashboard from './pages/StudentDashboard';
import SPSODashboard from './pages/SPSODashboard';
import History from './pages/student/history';
import Print from './pages/student/print';
import PrintPurchasePage from './pages/student/purchase';
const PrivateRoute = () => {
  const isAuthenticated = localStorage.getItem('token');
  if (!isAuthenticated) {
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

        {/* Private Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path="/student-dashboard" element={<StudentDashboard />} />
          <Route path="/spsodashboard" element={<SPSODashboard />} />
          <Route path="/history" element={<History />} />
          <Route path="/print" element={<Print />} />
          <Route path="/purchase" element={<PrintPurchasePage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
