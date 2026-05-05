import PropTypes from "prop-types";

export default function FormField({ label, error, children }) {
    return (
        <div className="form-group">
            <label>{label}</label>
            {children}
            {error ? <p className="error">{error}</p> : null}
        </div>
    );
}

FormField.propTypes = {
    label: PropTypes.string.isRequired,
    error: PropTypes.string,
    children: PropTypes.node.isRequired,
};