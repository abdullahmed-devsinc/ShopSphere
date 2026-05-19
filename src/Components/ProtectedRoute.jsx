import { useSelector } from 'react-redux';
import { selectAuthState, selectCurrentUser } from '../Features/Auth/authSlice';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

export default function ProtectedRoute({ allowedRoles }) {
  const isAuthenticated = useSelector(selectAuthState);
  const currentUser = useSelector(selectCurrentUser);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }
  if (allowedRoles && !allowedRoles.includes(currentUser?.role)) {
    return <Navigate to='/unauthorized' replace />;
  }
  return <Outlet />;
}
