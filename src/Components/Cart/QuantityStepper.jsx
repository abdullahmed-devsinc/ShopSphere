import PropTypes from 'prop-types';
import Button from '../Button';

export default function QuantityStepper({
  quantity,
  onDecrease,
  onIncrease,
  disableDecrease,
  disableIncrease,
  className = '',
}) {
  return (
    <div className={`card-qty-stepper ${className}`.trim()}>
      <Button
        variant='card-qty-btn'
        onClick={onDecrease}
        disabled={quantity < 0}
        aria-label='Decrease quantity'
      >
        <span className='material-symbols-outlined'>
          {quantity < 2 ? 'delete' : 'remove'}
        </span>
      </Button>

      <span className='card-qty-count'>{quantity}</span>

      <Button
        variant='card-qty-btn'
        onClick={onIncrease}
        disabled={disableIncrease}
        aria-label='Increase quantity'
      >
        <span className='material-symbols-outlined'>add</span>
      </Button>
    </div>
  );
}

QuantityStepper.propTypes = {
  quantity: PropTypes.number.isRequired,
  onDecrease: PropTypes.func.isRequired,
  onIncrease: PropTypes.func.isRequired,
  disableDecrease: PropTypes.bool,
  disableIncrease: PropTypes.bool,
  className: PropTypes.string,
};
