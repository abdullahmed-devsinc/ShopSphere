import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { formatMoney } from '../../utils/money';
import CartStepper from './CartStepper';

export default function CartItem({ item }) {
  const lineTotal = item.quantity * item.price;

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

      <CartStepper product={item} className='card-qty-stepper--cart' />

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
