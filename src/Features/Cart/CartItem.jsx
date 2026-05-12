import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from '../../Components/Button';
import QuantityStepper from '../../Components/Cart/QuantityStepper';
import { updateQuantity, removeFromCart } from './cartSlice';
import { selectStock } from '../Products/productSlice';
import { formatMoney } from '../../utils/money';

export default function CartItem({ item }) {
  const dispatch = useDispatch();
  const itemStock = useSelector(selectStock(item.id));
  const lineTotal = item.quantity * item.price;

  const handleDecrease = () => {
    if (item.quantity <= 1) return;
    dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }));
  };

  const handleIncrease = () => {
    if (item.quantity >= itemStock) return;
    dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }));
  };

  return (
    <div className='card card-horizontal cart-item-row'>
      <Link
        to={`/productdetail/${item.id}`}
        className='card-img-wrap card-img-wrap--link'
      >
        <img
          className='card-img'
          src={
            item.img ||
            'https://res.cloudinary.com/dnx0tlcxk/image/upload/v1778245743/mvmobckdnxwhq66leqpo.jpg'
          }
          alt={item.name}
        />
      </Link>

      <div className='cart-item-info'>
        <Link to={`/productdetail/${item.id}`} className='cart-item-title-link'>
          <h3 className='card-title'>{item.name}</h3>
        </Link>
        <p className='card-price-per-item'>${formatMoney(item.price)} each</p>
      </div>

      <QuantityStepper
        quantity={item.quantity}
        onDecrease={
          item.quantity <= 1 ? () => dispatch(removeFromCart(item.id)) : handleDecrease
        }
        onIncrease={handleIncrease}
        disableDecrease={item.quantity <= 1}
        disableIncrease={itemStock <= item.quantity}
        className='card-qty-stepper--cart'
      />

      <p className='card-price cart-item-line-total'>${formatMoney(lineTotal)}</p>
    </div>
  );
}

CartItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
    stock: PropTypes.number.isRequired,
    img: PropTypes.string,
  }).isRequired,
};
