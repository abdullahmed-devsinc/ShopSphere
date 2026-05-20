import { useNavigate } from 'react-router-dom';
import Button from '../Components/Button';

export default function UnAuthorized() {
  const navigate = useNavigate();
  return (
    <div className='page page-unauthorized error-page-wrapper'>
      <div className='error-glass-card'>
        <h1>Access Denied</h1>
        <p>You do not have permission to view this page.</p>
        <Button variant='primary' onClick={() => navigate('/', { replace: true })}>
          <span className='material-symbols-outlined' style={{ fontSize: '20px' }}>
            home
          </span>
          Go To Home
        </Button>
      </div>
    </div>
  );
}
