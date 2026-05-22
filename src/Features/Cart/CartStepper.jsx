import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import {
  removeFromCart,
  updateQuantity,
  selectCartItemById,
  addToCart,
} from './cartSlice';
import QuantityStepper from '../../Components/Cart/QuantityStepper';
import Button from '../../Components/Button';

export default function CartStepper({ product, className = '', variant = 'card' }) {
  const dispatch = useDispatch();
  const cartItem = useSelector(selectCartItemById(product.id));
  const cartQuantity = cartItem?.cartQuantity || product.cartQuantity || 0;

  const handleDecrease = () => {
    if (cartQuantity <= 1) {
      dispatch(removeFromCart(product.id));
      return;
    }
    dispatch(updateQuantity({ id: product.id, cartQuantity: cartQuantity - 1 }));
  };

  const handleIncrease = () => {
    if (product.stock > cartQuantity)
      dispatch(updateQuantity({ id: product.id, cartQuantity: cartQuantity + 1 }));
  };

  const handleAddToCart = () => {
    if (product.stock > 0) dispatch(addToCart(product));
  };

  if (cartQuantity > 0) {
    const stepperElement = (
      <QuantityStepper
        cartQuantity={cartQuantity}
        onDecrease={handleDecrease}
        onIncrease={handleIncrease}
        disableDecrease={cartQuantity <= 0}
        disableIncrease={cartQuantity >= product.stock}
        className={className}
      />
    );
    if (variant === 'detail') {
      return <div className='product-cart-stepper-wrapper'>{stepperElement}</div>;
    }
    return stepperElement;
  }
  return (
    <Button variant='primary' onClick={handleAddToCart} disabled={product.stock === 0}>
      {variant === 'detail' && (
        <span className='material-symbols-outlined'>shopping_bag</span>
      )}
      Add to Cart
    </Button>
  );
}

CartStepper.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    stock: PropTypes.number,
    cartQuantity: PropTypes.number,
  }).isRequired,
  className: PropTypes.string,
};
