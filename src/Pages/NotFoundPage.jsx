import { useNavigate } from 'react-router-dom';
import Button from '../Components/Button';

export default function NotFoundPage() {
  const navigate = useNavigate();
  console.log('NotFoundPage rendered');
  return (
    <div className='page page-not-found error-page-wrapper'>
      <div className='error-glass-card'>
        <h1>Page Not Found</h1>
        <p>
          The page you are looking for does not exist, has been removed, or is temporarily
          unavailable.
        </p>
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
