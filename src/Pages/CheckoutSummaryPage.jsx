import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { clearCart } from '../Features/Cart/cartSlice';
import CheckoutLineItem from '../Components/CheckoutLineItem';
import CheckoutSuccessPopup from '../Components/CheckoutSuccessPopup';
import PageHeader from '../Components/Common/PageHeader';
import EmptyState from '../Components/Common/EmptyState';
import OrderSummary from '../Components/Cart/OrderSummary';
import { tax_rate } from '../utils/tax';
import { useCartSummary } from '../hooks/useCartSummary';
import { useNavigate } from 'react-router-dom';
import { selectAuthState } from '../Features/Auth/authSlice';
import { useSelector } from 'react-redux';

export default function CheckoutSummaryPage() {
  const dispatch = useDispatch();
  const authState = useSelector(selectAuthState);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const navigate = useNavigate();
  const { items, subTotal, cartCount, taxAmount, grandTotal } = useCartSummary();

  const handleCheckout = () => {
    dispatch(clearCart());
    setShowSuccessPopup(true);
  };
 
  if (showSuccessPopup) return <CheckoutSuccessPopup />;

  if (items.length === 0) {
    return (
      <div className='checkout-page'>
        <PageHeader
          title='Checkout'
          description='Almost there — review and confirm your order.'
        />
        <EmptyState
          icon='shopping_bag'
          title='Your cart is empty'
          message='Add items to your cart before checking out.'
          action={
            <Link to='/' className='btn btn-primary'>
              Browse products
            </Link>
          }
        />
      </div>
    );
  }

  return (
    <div className='checkout-page'>
      <PageHeader
        title='Checkout'
        description={`${cartCount} ${cartCount === 1 ? 'item' : 'items'} · Review details and confirm your purchase`}
        right={
          <Link to='/cart' className='page-header-link'>
            <span className='material-symbols-outlined page-header-link-icon'>
              arrow_back
            </span>
            Back to cart
          </Link>
        }
      />

      <div className='checkout-layout'>
        <div className='checkout-items'>
          <h3 className='checkout-section-title'>Items in your order</h3>
          <div className='checkout-list'>
            {items.map((item) => (
              <CheckoutLineItem key={item.id} item={item} />
            ))}
          </div>
        </div>

        <OrderSummary
          subtotal={subTotal}
          taxAmount={taxAmount}
          taxLabel={`Tax (${Math.round(tax_rate * 100)}%)`}
          shippingLabel='Standard  calculated separately'
          totalLabel='Total'
          totalAmount={grandTotal}
          ctaText='Complete purchase'
          onCtaClick={handleCheckout}
          note='By completing your purchase you agree to our standard terms for demo checkout.'
        />
      </div>
    </div>
  );
}
