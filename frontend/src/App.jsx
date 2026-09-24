import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import AuthLayout from './layouts/AuthLayout';
import DashboardLayout from './layouts/DashboardLayout';
import PublicLayout from './layouts/PublicLayout';

// Public pages
import PublicHome from './pages/PublicHome';
import MenuPage from './pages/MenuPage';
import AttendanceVerify from './pages/AttendanceVerify';

// Admin / Auth pages
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Members from './pages/Members';
import MemberDetail from './pages/MemberDetail';
import Groceries from './pages/Groceries';
import AdminAttendance from './pages/AdminAttendance';

const ProtectedRoute = ({ children }) => {
  const { admin, loading } = useAuth();
  if (loading) return null;
  if (!admin) return <Navigate to="/login" replace />;
  return children;
};

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Official Public Customer-Facing Website Routes */}
        <Route path="/" element={<PublicLayout><PublicHome /></PublicLayout>} />
        <Route path="/menu" element={<PublicLayout><MenuPage /></PublicLayout>} />
        <Route path="/menu/:category" element={<PublicLayout><MenuPage /></PublicLayout>} />
        <Route path="/attendance/verify/:token" element={<AttendanceVerify />} />
        
        {/* Login Page with Admin & Member selection */}
        <Route path="/login" element={<Login />} />
        
        {/* Existing Admin Dashboard Protected Routes */}
        <Route element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/members" element={<Members />} />
          <Route path="/members/:id" element={<MemberDetail />} />
          <Route path="/attendance" element={<AdminAttendance />} />
          <Route path="/groceries" element={<Groceries />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
