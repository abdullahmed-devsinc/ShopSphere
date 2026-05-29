import { useRouteError, isRouteErrorResponse, useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import ScrollToTop from '../Components/ScrollToTop';

export default function ErrorPage() {
  const error = useRouteError();
  const navigate = useNavigate();

  let title = 'Something went wrong';
  let message = 'An unexpected error has occurred.';

  if (isRouteErrorResponse(error)) {
    title = `${error.status} – ${error.statusText}`;
    message = error.data?.message || message;
  } else if (error instanceof Error) {
    message = error.message;
  }

  return (
    <>
      <Navbar minimal={true} />
      <main className='app-shell'>
        <div className='app-bg' />
        <div className='app-content'>
          <ScrollToTop />
          <div className='error-page-wrapper'>
            <div className='error-glass-card'>
              <h1>{title}</h1>
              <p>{message}</p>
              <button className='btn btn-primary' onClick={() => navigate('/')}>
                Go Home
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
