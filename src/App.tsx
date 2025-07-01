import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import GardenTypes from './pages/GardenTypes';
import GardenDetail from './pages/GardenDetail';
import Pricing from './pages/Pricing';
import Booking from './pages/Booking';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import AuthCallback from './pages/AuthCallback';
// Dashboard imports
import DashboardLayout from './components/dashboard/DashboardLayout';
import DashboardHome from './components/dashboard/DashboardHome';
import BookingsList from './components/dashboard/Bookings/BookingsList';
import BookingDetails from './components/dashboard/Bookings/BookingDetails';
import PaymentMethods from './components/dashboard/Payments/PaymentMethods';
import PaymentHistory from './components/dashboard/Payments/PaymentHistory';
import ProfileSettings from './components/dashboard/Settings/ProfileSettings';
import SecuritySettings from './components/dashboard/Settings/SecuritySettings';
import NotificationSettings from './components/dashboard/Settings/NotificationSettings';
import PrivacySettings from './components/dashboard/Settings/PrivacySettings';

// ProtectedRoute component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  return isAuthenticated ? <>{children}</> : <Navigate to="/" replace />;
};

function App() {
  return (
    <AuthProvider>
    <Routes>
        <Route path="/auth/callback" element={<AuthCallback />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="garden-types" element={<GardenTypes />} />
        <Route path="garden-types/:type" element={<GardenDetail />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="booking" element={<Booking />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
        {/* Dashboard routes (protected) */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }>
          <Route index element={<DashboardHome />} />
          <Route path="bookings" element={<BookingsList />} />
          <Route path="bookings/:id" element={<BookingDetails />} />
          <Route path="payments" element={<PaymentMethods />} />
          <Route path="payments/history" element={<PaymentHistory />} />
          <Route path="settings" element={<ProfileSettings />} />
          <Route path="settings/security" element={<SecuritySettings />} />
          <Route path="settings/notifications" element={<NotificationSettings />} />
          <Route path="settings/privacy" element={<PrivacySettings />} />
        </Route>
    </Routes>
    </AuthProvider>
  );
}

export default App;