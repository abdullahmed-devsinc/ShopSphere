import { loginUser, logoutUser } from '../Services/loginService';
import { useState } from 'react';
import Button from './Button';

export default function LoginModal({ role = 'user' }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const title = role === 'admin' ? 'Admin Login' : 'User Login';

  const handleLogin = (e) => {
    e.preventDefault();
    const success = loginUser(email, password);
    if (!success) {
      setError('Invalid email or password');
    } else {
      setError('');
    }
  };

  return (
    <div className='auth-modal-overlay'>
      <div className='auth-modal'>
        <h2 className='auth-modal-title'>{title}</h2>

        <form className='auth-modal-form' onSubmit={handleLogin}>
          <div className='form-group'>
            <label>
              Email
              <input
                type='text'
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
          </div>

          <div className='form-group'>
            <label>
              Password
              <input
                type='password'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </div>

          {error && (
            <p
              className='error'
              style={{
                color: 'var(--danger)',
                margin: '4px 0 0',
                fontSize: '0.9rem',
                textAlign: 'center',
                fontWeight: '600',
              }}
            >
              {error}
            </p>
          )}

          <Button variant='primary' type='submit'>
            Login
          </Button>
        </form>
      </div>
    </div>
  );
}
