import React from 'react';
import { TextField } from '@mui/material';
import {
  montserratFamily,
  buttonStyle,
  inputStyle,
  HeaderHome,
  SubmitButton,
  ErrorText
} from '../components';

export const header = {
  title: '¿Olvidaste tu contraseña?',
  subtitle: ''
}

export const ForgotPassword = () => {
  return (
    <>
      <HeaderHome header={header} />
      <div className='w-100'>
        <div className='container form bg-white form-password d-flex flex-column justify-content-evenly'>
          <div className='header-form'>
            <h2 className='p-3 form-title'><strong>Recuperación de clave</strong></h2>
            <span className='form-subtitle'>¡No te preocupes! Suele ocurrir.<p>Por favor ingresa el correo asociado con tu cuenta</p></span>
          </div>
          <form className='row g-3'>
            <div className='col-12'>
              <TextField sx={inputStyle} inputProps={{ style: montserratFamily }} id='name' label='Correo Electrónico' placeholder='Correo Electrónico' margin='dense' fullWidth required />
            </div>
            <div className='col-12'>
              <ErrorText error='El correo ingresado no existe' />
            </div>
            <div className='col-12'>
              <SubmitButton buttonStyle={buttonStyle} buttonText='Enviar' />
            </div>
          </form>
        </div>
      </div>
    </>
  )
}