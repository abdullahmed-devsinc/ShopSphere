import { useNavigate } from "react-router-dom";
import Button from "./Button";

export default function CheckoutSuccessPopup() {
    const navigate = useNavigate();
    const orderId = "ORD-" + Math.floor(100000 + Math.random() * 900000);

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="success-icon">✓</div>
                <h2>Order Confirmed!</h2>
                <p>Thank you for shopping with us. Your order <strong>{orderId}</strong> has been successfully placed.</p>
                <div style={{ marginTop: '20px' }}>
                    <Button onClick={() => navigate('/', { replace: true })}>Continue Shopping</Button>
                </div>
            </div>
        </div>
    );
}
