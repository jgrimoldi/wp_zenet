import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import AuthServices from '../services/AuthServices';
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

export const header = {
  title: 'Cambio de contraseña',
  subtitle: ''
}

export const ResetPassword = () => {

  const initialValues = { password: '', passwordVerify: '' };
  const [formValues, setFormValues] = useState(initialValues);
  const [tooltip, setTooltip] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showError, setShowError] = useState({ value: '', error: null });
  const [successful, setSuccessful] = useState(null);
  const [accessToken, setAccessToken] = useState({ email: '', token: '' });
  const [errorToken, setErrorToken] = useState({ value: '', error: true });
  const [isValidToken, setIsValidToken] = useState(null);

  const { token } = useParams();

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
    if (errorToken.error) {
      getToken();
    }
  })

  const getToken = async () => {

    await AuthServices.resetPassword(token)
      .then(response => {
        const message = response.data.message;
        const email = response.data.email;

        if (message === 'PASSWORD_RESET_LINK_OK') {
          setIsValidToken(true);
          setAccessToken({ ...accessToken, email: { email }, token: { token } });
          setErrorToken({ ...errorToken, error: false });
        }

      })
      .catch(error => {
        const errorMessage = error.response.data.error;

        setIsValidToken(false);

        if (errorMessage === 'PASSWORD_RESET_LINK_IS_INVALID_OR_HAS_EXPIRED') {
          setErrorToken({ ...errorToken, value: 'El link de recuperación ha expirado, vuelva a intentar', error: false });
        } else if (errorMessage === 'ERROR_SEND_EMAIL') {
          setErrorToken({ ...errorToken, value: 'Error al enviar el mail, vuelva a intentar', error: false });
        } else {
          setErrorToken({ ...errorToken, value: 'Ocurrió un error, vuelva a intentar', error: false });
        }

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

  const handleSubmit = async () => {

    if (isValidToken) {
      if (!showError.error && formValues.password === formValues.passwordVerify) {

        await AuthServices.updateViaEmail(accessToken.email, formValues.password, accessToken.token)
          .then(response => {
            if (response.data === 'UPDATE_PASSWORD_EMAIL_OK') {
              setSuccessful(true);
            }
          })
          .catch(error => {
            const errorMessage = error.response.data.error;

            if (errorMessage === 'UPDATE_PASSWORD_EMAIL_RESET_LINK_IS_INVALID_OR_HAS_EXPIRED') {
              setShowError({ ...showError, value: 'El link de recuperación ha expirado, vuelva a intentar', error: true });
            } else {
              setShowError({ ...showError, value: 'Ocurrió un error, vuelva a intentar', error: true });
            }
          })

      } else {
        setShowError({ ...showError, value: 'Ocurrió un problema al cambiar la contraseña', error: true });
      }
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
            {isValidToken ?
              (<>
                < div className='col-12'>
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
              </>)
              :
              (<div className='header-form'>
                <h2 className='p-3 form-title'><strong>{errorToken.value}</strong></h2>
              </div>)
            }
          </form>
        </div>
      </div >
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