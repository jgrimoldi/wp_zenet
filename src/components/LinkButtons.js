import React from "react";
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'

const LinkButtons = ({ linkStyle, linkText, link}) => (
    <Link type="button" className="w-100 btn" style={ linkStyle } to={ link }>
        { linkText }   
    </Link>
)

LinkButtons.propTypes = {
    linkText: PropTypes.string,
    link: PropTypes.string
};

LinkButtons.defaultProps = {
    linkText: 'Boton sin asignar',
    link: '/'
};

export default LinkButtons;