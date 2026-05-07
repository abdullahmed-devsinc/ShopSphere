import { useDispatch } from 'react-redux';
import { login } from '../Features/Auth/authSlice';
import { useState } from 'react';
import Button from './Button';

export default function LoginModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleLogin = () => {
    const EMAIL = 'beffjezos@devsinc.com';
    const PASSWORD = 'shopsphere';

    if (email == EMAIL && password == PASSWORD) dispatch(login());
  };
  return (
    <div className='auth-modal-overlay'>
      <div className='auth-modal'>
        <h2 className='auth-modal-title'>Admin Login</h2>

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
                type='text'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </div>

          <Button variant='primary' type='submit'>
            Login
          </Button>
        </form>
      </div>
    </div>
  );
}
