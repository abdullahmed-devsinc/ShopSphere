import { replace, useNavigate } from 'react-router-dom';
import Button from '../Components/Button';

export default function UnAuthoried() {
  const navigate = useNavigate();
  return (
    <section className='page page-not-found page-unauthorized'>
      <p className='eyebrow'>403 UnAuthoried</p>
      <h1>Access Denied</h1>
      <p> You do not have permission to view this page</p>
      <Button variant='primary' onClick={() => navigate('/', { replace: true })}>
        Go To Home
      </Button>
    </section>
  );
}
