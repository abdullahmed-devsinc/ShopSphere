import { useNavigate } from 'react-router-dom';
import Button from './Button';

export default function CheckoutSuccessPopup() {
  const navigate = useNavigate();
  const orderId = 'ORD-' + Math.floor(100000 + Math.random() * 900000);

  return (
    <div className='modal-overlay'>
      <div className='modal-content'>
        <div className='success-icon'>
          <span className='material-symbols-outlined'>check</span>
        </div>
        <h2>Order Confirmed!</h2>
        <p>
          Thank you for shopping with us. Your order <strong>{orderId}</strong> has been
          successfully placed.
        </p>
        <div className='checkout-success-actions'>
          <Button variant='primary' onClick={() => navigate('/', { replace: true })}>
            Continue shopping
          </Button>
        </div>
      </div>
    </div>
  );
}
