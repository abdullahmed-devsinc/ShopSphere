import PropTypes from 'prop-types';
export default function Button({
    children,
    variant = "primary",
    disabled = false,
    onClick }
) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`btn btn-${variant}`}>
            {children}
        </button>
    )
}
Button.propTypes = {
    children: PropTypes.node.isRequired,
    variant: PropTypes.oneOf(['primary', 'secondary']),
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
};
