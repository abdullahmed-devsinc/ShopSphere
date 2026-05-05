import PropTypes from "prop-types";
import Button from "../Button";
import { formatMoney } from "../../utils/money";

export default function OrderSummary({
    subtotal,
    taxAmount = null,
    taxLabel = "Tax",
    shippingLabel = "Calculated at checkout",
    totalLabel = "Total",
    totalAmount,
    ctaText,
    onCtaClick,
    note,
}) {
    return (
        <aside className="cart-summary-panel checkout-summary-box">
            <h3 className="cart-summary-heading">Order summary</h3>

            <div className="summary-row">
                <span>Subtotal</span>
                <span>${formatMoney(subtotal)}</span>
            </div>

            {taxAmount != null && (
                <div className="summary-row">
                    <span>{taxLabel}</span>
                    <span>${formatMoney(taxAmount)}</span>
                </div>
            )}

            <div className="summary-row summary-row--muted">
                <span>Shipping</span>
                <span>{shippingLabel}</span>
            </div>

            <hr className="summary-divider" />

            <div className="summary-row total-row">
                <span>{totalLabel}</span>
                <span>${formatMoney(totalAmount)}</span>
            </div>

            {ctaText && (
                <div className="checkout-submit-wrap">
                    <Button variant="primary" onClick={onCtaClick}>
                        {ctaText}
                    </Button>
                </div>
            )}

            {note ? <p className="checkout-trust-note cart-summary-note">{note}</p> : null}
        </aside>
    );
}

OrderSummary.propTypes = {
    subtotal: PropTypes.number.isRequired,
    taxAmount: PropTypes.number,
    taxLabel: PropTypes.string,
    shippingLabel: PropTypes.string,
    totalLabel: PropTypes.string,
    totalAmount: PropTypes.number.isRequired,
    ctaText: PropTypes.string,
    onCtaClick: PropTypes.func,
    note: PropTypes.string,
};