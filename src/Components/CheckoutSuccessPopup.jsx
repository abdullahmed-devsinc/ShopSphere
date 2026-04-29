import { replace, useNavigate } from "react-router-dom";
import Button from "./Button";

export default function CheckoutSuccessPopup() {
    const navigate = useNavigate();
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="success-icon">✓</div>
                <h2>Your order is complete</h2>
                <p>Thank you for shopping with us.</p>
                <Button onClick={() => navigate('/', { replace: true })}>Home</Button>
            </div>
        </div>
    );
}
