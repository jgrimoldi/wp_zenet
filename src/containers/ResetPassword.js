import React from 'react';
import { FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  montserratFamily,
  buttonStyle,
  inputStyle,
  HeaderHome,
  SubmitButton,
  visibilityStyle,
  ErrorText
} from '../components';

export const header = {
  title: 'Cambio de contraseña',
  subtitle: ''
}

export const ResetPassword = () => {

  const [values, setValues] = React.useState({
    password: '',
    passwordVerify: '',
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword, });
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
          <form className='row g-3'>

            <div className='col-12'>
              <FormControl sx={inputStyle} variant='outlined' fullWidth required>
                <InputLabel htmlFor='password'>Nueva contraseña</InputLabel>
                <OutlinedInput inputProps={{ style: montserratFamily }} id='password' type={values.showPassword ? 'text' : 'password'} value={values.password} label='Nueva contraseña' onChange={handleChange('password')}
                  endAdornment={
                    <InputAdornment position='end'>
                      <IconButton sx={visibilityStyle} aria-label='Mostrar/Ocultar Contraseña'
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge='end' >{values.showPassword ? <VisibilityOff /> : <Visibility />} </IconButton>
                    </InputAdornment>
                  } />
              </FormControl>
            </div>

            <div className='col-12'>
              <FormControl sx={inputStyle} variant='outlined' fullWidth required>
                <InputLabel htmlFor='passwordVerify'>Confirmar contraseña</InputLabel>
                <OutlinedInput inputProps={{ style: montserratFamily }} id='passwordVerify' type={values.showPassword ? 'text' : 'password'} value={values.passwordVerify} label='Confirmar contraseña' onChange={handleChange('passwordVerify')}
                  endAdornment={
                    <InputAdornment position='end'>
                      <IconButton sx={visibilityStyle} aria-label='Mostrar/Ocultar Contraseña'
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge='end' >{values.showPassword ? <VisibilityOff /> : <Visibility />} </IconButton>
                    </InputAdornment>
                  } />
              </FormControl>
            </div>
            <div className='col-12'>
              <ErrorText error='Las contraseñas no coinciden' />
            </div>
            <div className='col-12'>
              <SubmitButton buttonStyle={buttonStyle} buttonText='Confirmar' />
            </div>
          </form>
        </div>
      </div>
    </>
  )
}