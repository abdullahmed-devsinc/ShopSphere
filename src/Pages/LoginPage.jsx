import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from '../Components/Button';
import { useAuth } from '../hooks/useAuth';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  const { isAuthenticated, login } = useAuth();
  const from = location.state?.from?.pathname || '/';

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, from, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill all of the fields');
      return;
    }
    const success = login(email, password);
    if (!success) {
      setError('Invalid email or password. Please try again');
    }
  };
  return (
    <div className='login-page'>
      <div className='login-card'>
        <h2 className='login-card__title'>Sign in to ShopSphere</h2>
        <p className='login-card__subtitle'>Welcome back! Please enter your details.</p>
        <form className='login-card__form' onSubmit={handleSubmit}>
          <div className='form-group'>
            <label htmlFor='email'>Email Address</label>
            <input
              id='email'
              type='email'
              placeholder='Enter your email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='app-input'
            />
          </div>
          <div className='form-group'>
            <label htmlFor='password'>Password</label>
            <input
              id='password'
              type='password'
              placeholder='Enter your password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='app-input'
            />
          </div>
          {error && <p className='login-card__error-text'>{error}</p>}
          <Button variant='primary' type='submit' className='login-card__submit-btn'>
            Sign In
          </Button>
        </form>
      </div>
    </div>
  );
}
