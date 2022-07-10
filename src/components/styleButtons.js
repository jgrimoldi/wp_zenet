import { orange } from "@mui/material/colors";

export const montserratFamily = {
    fontFamily: 'Montserrat',
    fontWeight: '600',
}

export const buttonStyle = {
    width: '100%',
    background: '#F0443A',
    color: '#F9F9F9',
    fontWeight: '700',
    fontSize: '20px',
    padding: '14px 0',
    border: '1px solid #F0443A',
    borderRadius: '20px',
    boxShadow: '0px 25px 50px - 12px rgba(0, 0, 0, 0.25)'
};

export const loadingButton = {
    fontFamily: 'Montserrat',
    width: '100%',
    background: 'transparent',
    color: '#6c0a6f !important',
    fontSize: '20px',
    padding: '14px 0',
    border: '1px solid #6c0a6f !important',
    borderRadius: '20px',
    boxShadow: '0px 25px 50px - 12px rgba(0, 0, 0, 0.25)'
}

export const textStyle = {
    padding: '0',
    textDecoration: 'underline',
    lineHeight: '17px',
    color: '#F97449'
};

export const inputStyle = {
    '& label.Mui-focused': {
        color: '#6c0a6f',
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: '#6c0a6f',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderWidth: '2px',
            borderRadius: '2rem',
            borderColor: '#F97449',
        },
        '&:hover fieldset': {
            borderColor: '#F97449',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#6c0a6f',
        },
    },

};

export const checkboxStyle = {
    color: '#f97449',
    '&.Mui-checked': {
        color: orange[600],
    },
    '&.MuiFormControlLabel-root': {
        fontFamily: 'Montserrat'
    },
};

export const visibilityStyle = {
    '&.MuiIconButton-root': {
        color: '#6c0a6f'
    }
}

const multipleExport = { montserratFamily, buttonStyle, loadingButton, textStyle, inputStyle, checkboxStyle, visibilityStyle };

export default multipleExport;