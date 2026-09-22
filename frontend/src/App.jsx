import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import { useUserAuth } from './contexts/UserAuthContext';

// Existing admin pages
import Dashboard from './pages/Dashboard';
import Members from './pages/Members';
import MemberDetail from './pages/MemberDetail';
import Groceries from './pages/Groceries';
import Announcements from './pages/admin/Announcements';

// Existing layouts
import DashboardLayout from './layouts/DashboardLayout';

// New public pages
import HomePage from './pages/public/HomePage';
import MenuPage from './pages/public/MenuPage';
import LoginPage from './pages/public/LoginPage';
import SignupPage from './pages/public/SignupPage';

// New member pages
import MemberDashboard from './pages/member/MemberDashboard';
import MemberPayments from './pages/member/MemberPayments';
import MemberProfile from './pages/member/MemberProfile';
import MemberLayout from './layouts/MemberLayout';

// Admin protected route
const AdminProtectedRoute = ({ children }) => {
  const { admin, loading } = useAuth();
  if (loading) return null;
  if (!admin) return <Navigate to="/login" replace />;
  return children;
};

// Member protected route
const MemberProtectedRoute = ({ children }) => {
  const { user, loading } = useUserAuth();
  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Member routes */}
        <Route path="/member" element={<MemberProtectedRoute><MemberLayout /></MemberProtectedRoute>}>
          <Route path="dashboard" element={<MemberDashboard />} />
          <Route path="payments" element={<MemberPayments />} />
          <Route path="profile" element={<MemberProfile />} />
        </Route>

        {/* Admin routes — existing pages with /admin prefix */}
        <Route path="/admin" element={<AdminProtectedRoute><DashboardLayout /></AdminProtectedRoute>}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="members" element={<Members />} />
          <Route path="members/:id" element={<MemberDetail />} />
          <Route path="groceries" element={<Groceries />} />
          <Route path="announcements" element={<Announcements />} />
        </Route>

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
