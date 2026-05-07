import { useSelector } from 'react-redux';
import { selectAuthState } from '../Features/Auth/authSlice';
import LoginModal from './LoginModal';

export default function ProtectedRoute({ children }) {
  const isAuthenticated = useSelector(selectAuthState);

  if (!isAuthenticated) {
    return (
      <div className="protected-fallback-page">
        <LoginModal />
      </div>
    );
  }
  return children;
}
