import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton, Tooltip, ClickAwayListener } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  montserratFamily,
  buttonStyle,
  inputStyle,
  HeaderHome,
  SubmitButton,
  visibilityStyle,
  ErrorText,
  tooltipStyle
} from '../components';
import AuthServices from '../services/AuthServices';

export const header = {
  title: 'Cambio de contraseña',
  subtitle: ''
}

export const ResetPassword = ({props}) => {

  const initialValues = { password: '', passwordVerify: '' };
  const [formValues, setFormValues] = useState(initialValues);
  const [tooltip, setTooltip] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showError, setShowError] = useState({ value: '', error: null });
  const [successful, setSuccessful] = useState(null);

  console.log(props)


  const handleChange = (prop) => (event) => {
    setFormValues({ ...formValues, [prop]: event.target.value });
  };

  const handleClose = () => {
    setTooltip(false);
  }

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const isEmpty = (password) => {
    return (password.trim().length === 0 || !password)
  }

  useEffect(() => {
    getToken();
  })

  const getToken = async () => {

    await AuthServices.resetPassword(token)
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.log(error)
      })

  }

  const validate = (event) => {

    const name = event.target.name;
    const passwordRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[+@$!%*?&])[A-Za-z\d@$!%*?+&]{8,}$/;

    if (name === 'password') {
      setTooltip(true);
      if (isEmpty(formValues.password)) {
        setShowError({ ...showError, value: 'Al menos un campo esta vacío', error: true });
      } else if (!passwordRegEx.test(formValues.password)) {
        setShowError({ ...showError, value: 'No es una contraseña válida', error: true });
      } else {
        setShowError({ ...showError, error: false });
      }
    }

    if (name === 'passwordVerify') {
      if (isEmpty(formValues.password)) {
        setShowError({ ...showError, value: 'Al menos un campo esta vacío', error: true });
      } else if (formValues.passwordVerify.length >= formValues.password.length / 2
        && formValues.passwordVerify !== formValues.password) {
        setShowError({ ...showError, value: 'Las contraseñas deben coincidir', error: true });
      } else {
        setShowError({ ...showError, error: false });
      }
    }
  }

  const handleSubmit = () => {
    if (!showError.error && formValues.password === formValues.passwordVerify) {

      // await AuthServices.updatePassword()
      // .then(response => {

      // })
      // .catch(error => {

      // })

    } else {
      setShowError({ ...showError, value: 'Ocurrió un problema al cambiar la contraseña', error: true });
    }
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <HeaderHome header={header} />
      <div className='w-100'>
        <div className='container form bg-white form-password d-flex flex-column justify-content-evenly'>
          <div className='header-form'>
            <h2 className='p-3 form-title'><strong>Recuperación de clave</strong></h2>
          </div>
          <form className='row g-3'>

            <div className='col-12'>
              <ClickAwayListener onClickAway={handleClose}>
                <Tooltip sx={tooltipStyle} placement='top-end' arrow disableFocusListener disableHoverListener disableTouchListener
                  onClose={handleClose} open={tooltip}
                  PopperProps={{
                    disablePortal: true,
                  }}
                  title='Debe contener: Mayúsculas, Minúsculas, Números y Símbolos'>
                  <FormControl sx={inputStyle} variant='outlined' fullWidth required>

                    <InputLabel htmlFor='password'>Contraseña</InputLabel>
                    <OutlinedInput inputProps={{ style: montserratFamily }} id='password' name='password'
                      label='Contraseña'
                      value={formValues.password}
                      onBlur={validate}
                      onKeyUp={validate}
                      onChange={handleChange('password')}
                      placeholder='Contraseña (8 a 64 carácteres)'
                      type={showPassword ? 'text' : 'password'}
                      autoComplete='new-password'
                      endAdornment={
                        <InputAdornment position='end'>
                          <IconButton sx={visibilityStyle} aria-label='Mostrar/Ocultar Contraseña'
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge='end' >{showPassword ? <VisibilityOff /> : <Visibility />} </IconButton>
                        </InputAdornment>
                      } />

                  </FormControl>
                </Tooltip>
              </ClickAwayListener>
            </div>

            <div className='col-12'>
              <FormControl sx={inputStyle} variant='outlined' fullWidth required>
                <InputLabel htmlFor='passwordVerify'>Confirmar contraseña</InputLabel>
                <OutlinedInput inputProps={{ style: montserratFamily }} id='passwordVerify' name='passwordVerify'
                  label='Confirmar contraseña'
                  value={formValues.passwordVerify}
                  onBlur={validate}
                  onKeyUp={validate}
                  onChange={handleChange('passwordVerify')}
                  placeholder='Confirmar contraseña'
                  type={showPassword ? 'text' : 'password'}
                  autoComplete='new-password'
                  endAdornment={
                    <InputAdornment position='end'>
                      <IconButton sx={visibilityStyle} aria-label='Mostrar/Ocultar Contraseña'
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge='end' >{showPassword ? <VisibilityOff /> : <Visibility />} </IconButton>
                    </InputAdornment>
                  } />
              </FormControl>
            </div>
            {showError.error &&
              <div className='col-12'>
                <ErrorText error={showError.value} />
              </div>
            }
            {successful &&
              <div className='col-12'>
                <div className="successful-notice">
                  La contraseña fue reestablecida con exito!
                </div>
              </div>
            }
            <div className='col-12'>
              <SubmitButton actionForm={() => handleSubmit()} buttonStyle={buttonStyle} buttonText='Confirmar' />
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

ResetPassword.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      token: PropTypes.string.isRequired,
    }),
  }),
};