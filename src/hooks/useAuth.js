import { useSelector, useDispatch } from 'react-redux';
import {
  selectAuthState,
  selectCurrentUser,
  logout,
  login,
} from '../Features/Auth/authSlice';
import { clearWishlist } from '../Features/Wishlist/wishlistSlice';
import users from '../data/users.json';

export function useAuth() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectAuthState);
  const user = isAuthenticated && useSelector(selectCurrentUser);

  const isAdmin = isAuthenticated && user?.role === 'admin';

  const isUser = isAuthenticated && !isAdmin;

  const handleLogin = (email, password) => {
    const foundUser = users.find((u) => u.email === email && u.password === password);
    if (foundUser) {
      dispatch(login(foundUser));
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    dispatch(clearWishlist());
    dispatch(logout());
  };
  return {
    isAuthenticated,
    user,
    isAdmin,
    isUser,
    logout: handleLogout,
    login: handleLogin,
  };
}
