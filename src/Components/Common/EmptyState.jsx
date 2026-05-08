import PropTypes from 'prop-types';

export default function EmptyState({ icon, iconClassName = '', title, message, action }) {
  return (
    <div className='empty-state'>
      <div className={`empty-state-icon ${iconClassName}`.trim()}>
        <span className='material-symbols-outlined'>{icon}</span>
      </div>
      <h2 className='empty-state-heading'>{title}</h2>
      <p>{message}</p>
      {action}
    </div>
  );
}

EmptyState.propTypes = {
  icon: PropTypes.string.isRequired,
  iconClassName: PropTypes.string,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  action: PropTypes.node,
};
