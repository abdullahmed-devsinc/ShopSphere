import PropTypes from 'prop-types';
import Button from '../Button';

export default function QuantityStepper({
  cartQuantity,
  onDecrease,
  onIncrease,
  disableDecrease,
  disableIncrease,
  className = '',
}) {
  return (
    <div className={`card-qty-stepper ${className}`.trim()}>
      <Button variant='card-qty-btn' onClick={onDecrease} disabled={disableDecrease}>
        <span className='material-symbols-outlined'>
          {cartQuantity < 2 ? 'delete' : 'remove'}
        </span>
      </Button>

      <span className='card-qty-count'>{cartQuantity}</span>

      <Button variant='card-qty-btn' onClick={onIncrease} disabled={disableIncrease}>
        <span className='material-symbols-outlined'>add</span>
      </Button>
    </div>
  );
}

QuantityStepper.propTypes = {
  cartQuantity: PropTypes.number.isRequired,
  onDecrease: PropTypes.func.isRequired,
  onIncrease: PropTypes.func.isRequired,
  disableDecrease: PropTypes.bool,
  disableIncrease: PropTypes.bool,
  className: PropTypes.string,
};
