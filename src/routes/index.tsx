import { Routes, Route, BrowserRouter } from 'react-router-dom';
import SignupPage from '../pages/SignupPage';
import LoginPage from '../pages/LoginPage';
import Dashboard from '../pages/Dashboard';
import { ProtectedRoute } from './ProtectedRoute';
import { AuthProvider } from '../context/AuthProvider';

const TimeTrackingRoutes = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default TimeTrackingRoutes;
