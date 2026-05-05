import PropTypes from "prop-types";
export default function PageHeader({ title, description, right }) {
    return (
        <div className={`page-header ${right ? "page-header--split" : ""}`}>
            <div>
                <h1 className="page-title">{title}</h1>
                {description ? <p className="page-description">{description}</p> : null}
            </div>
            {right}
        </div>

    );
}
PageHeader.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    right: PropTypes.node
}