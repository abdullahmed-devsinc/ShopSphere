import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { formatMoney } from '../utils/money';

export default function CheckoutLineItem({ item }) {
  const qty = item.quantity ?? 1;
  const lineTotal = qty * item.price;

  return (
    <div className='card card-horizontal checkout-line-item'>
      <Link
        to={`/productdetail/${item.id}`}
        className='card-img-wrap card-img-wrap--link'
      >
        <img className='card-img' src={item.img} alt={item.name} />
      </Link>

      <div className='checkout-line-main'>
        <Link to={`/productdetail/${item.id}`} className='checkout-line-title-link'>
          <h3 className='card-title'>{item.name}</h3>
        </Link>
        <p className='card-price-per-item'>${formatMoney(item.price)} each</p>
      </div>

      <div className='checkout-line-qty'>
        <span className='checkout-line-qty-label'>Qty</span>
        <span className='checkout-line-qty-val'>{qty}</span>
      </div>

      <p className='card-price checkout-line-price'>${formatMoney(lineTotal)}</p>
    </div>
  );
}

CheckoutLineItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
    img: PropTypes.string,
  }).isRequired,
};
