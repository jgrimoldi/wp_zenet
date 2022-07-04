import React, { Fragment } from "react";
import PropTypes from 'prop-types';

const SubmitButton = ({ buttonText, buttonStyle, buttonName }) => (
    <Fragment>
        <input type="submit" name={ buttonName } className="w-100 text-uppercase btn" style={ buttonStyle } value={ buttonText }  />
    </Fragment>
);

SubmitButton.propTypes = {
    buttonText: PropTypes.string.isRequired,
    buttonStyle: PropTypes.object,
};

SubmitButton.defaultProps = {
    buttonText: 'Boton submit sin asignar',
};

export default SubmitButton;