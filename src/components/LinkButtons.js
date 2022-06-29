import React from "react";
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'

const LinkButtons = ({ buttonText, link}) => (
    <Link to={ link }>
        { buttonText }   
    </Link>
)

LinkButtons.propTypes = {
    buttonText: PropTypes.string,
    link: PropTypes.string
};

LinkButtons.defaultProps = {
    buttonText: 'Boton sin asignar',
    link: '/'
};

export default LinkButtons;