import React from "react";
import PropTypes from "prop-types";
import WarningIcon from '@mui/icons-material/Warning';


const ErrorText = ({ error }) => (
    <div className="error-notice">
        <WarningIcon /> { error }
    </div>
);

ErrorText.propTypes = {
    error: PropTypes.string.isRequired,
};

ErrorText.defaultProps = {
    error: 'Error no declarado',
};

export default ErrorText;