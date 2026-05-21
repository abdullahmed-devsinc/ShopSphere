import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function ProtectedRoute({ allowedRoles }) {
  const { isAuthenticated, currentUser } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }
  if (allowedRoles && !allowedRoles.includes(currentUser?.role)) {
    return <Navigate to='/unauthorized' replace />;
  }
  return <Outlet />;
}
