import React, { useState } from 'react';
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
  const [tooltip, setTooltip] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  // const [showError, setShowError] = useState({ value: '', error: null });
  // const [successful, setSuccessful] = useState(null);

  const handleChange = (prop) => (event) => {
    setFormValues({ ...formValues, [prop]: event.target.value });
  };

  const handleClose = () => {
    setTooltip(false);
  }

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

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
          <article className='row g-3'>

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
            {/* {showError.error &&
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
            } */}
            <div className='col-12'>
              <SubmitButton buttonStyle={buttonStyle} buttonText='Confirmar' />
            </div>
          </article>
        </div>
      </div>
    </>
  )
}