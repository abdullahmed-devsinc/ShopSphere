import { useSelector } from 'react-redux';
import { selectAuthState, selectCurrentUser } from '../Features/Auth/authSlice';
import LoginModal from './LoginModal';
import { Navigate } from 'react-router-dom';
export default function ProtectedRoute({ children, allowedRoutes }) {
  const isAuthenticated = useSelector(selectAuthState);
  const currentUser = useSelector(selectCurrentUser);

  if (!isAuthenticated) {
    return (
      <div className='protected-fallback-page'>
        <LoginModal role={allowedRoutes?.[0] || 'user'} />
      </div>
    );
  }
  if (allowedRoutes && !allowedRoutes.includes(currentUser?.role)) {
    return <Navigate to='/' replace />;
  }
  return children;
}
