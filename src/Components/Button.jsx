import PropTypes from 'prop-types';
export default function Button({
    children,
    variant = "primary",
    disabled = false,
    type = "button",
    onClick }
) {
    const variantClass =
        variant === 'card-qty-btn' ? 'btn card-qty-btn' : `btn btn-${variant}`;
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={variantClass}>
            {children}
        </button>
    )
}
Button.propTypes = {
    children: PropTypes.node.isRequired,
    variant: PropTypes.oneOf(['primary', 'secondary', 'card-qty-btn', 'danger']),
    disabled: PropTypes.bool,
    type: PropTypes.oneOf(['button', 'submit', 'reset']),
    onClick: PropTypes.func,
};
