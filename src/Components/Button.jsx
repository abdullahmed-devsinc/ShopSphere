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
