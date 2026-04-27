import { useNavigate } from "react-router-dom";
import Button from "../Components/Button";


export default function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <section className="page page-not-found">
      <p className="eyebrow">404</p>
      <h1>Page not found</h1>
      <p>The page you are looking for does not exist.</p>
      <Button variant="primary" onClick={() => navigate('/', { replace: true })}>Go to Home</Button>
    </section>
  );
}
