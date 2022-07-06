import React, { Fragment } from "react";
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'

const LinkButtons = ({ linkStyle, linkText, link, target }) => (
    <Fragment>
        <Link type="button" className="btn" style={linkStyle} to={link} target={target}>
            {linkText}
        </Link>
    </Fragment>
)

LinkButtons.propTypes = {
    linkStyle: PropTypes.object,
    linkText: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    target: PropTypes.string.isRequired,
};

LinkButtons.defaultProps = {
    linkText: 'Boton sin asignar',
    link: '/',
    target: '_self',
};

export default LinkButtons;