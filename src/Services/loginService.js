import users from '../data/users.json';
import { store } from '../Store/index';
import { login, logout } from '../Features/Auth/authSlice';

export const authenticateUser = (email, password) => {
  const user = users.find((u) => u.email === email && u.password === password);
  return user;
};
export const loginUser = (email, password) => {
  const user = authenticateUser(email, password);
  if (user) {
    store.dispatch(login(user));
    return true;
  }
  return false;
};
export const logoutUser = () => {
  store.dispatch(logout());
};
export const checkLoggedIn = () => {
  return store.getState().auth.isAuthenticated;
};
