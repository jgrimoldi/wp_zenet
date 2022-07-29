import React, { useState } from 'react';
import { TextField } from '@mui/material';
import AuthServices from '../services/AuthServices'
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

  const [email, setEmail] = useState('');
  const [showError, setShowError] = useState({ value: '', error: null });
  const [successful, setSuccessful] = useState(null);

  const handleChange = (event) => {
    setEmail(event.target.value);
  }

  const isEmpty = (email) => {
    return (email.trim().length === 0 || !email)
  }

  const validate = () => {

    const emailRegEx = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

    if (isEmpty(email)) {

      setShowError({ ...showError, value: 'El campo no puede estar vacío', error: true });

    } else if (!emailRegEx.test(email)) {

      setShowError({ ...showError, value: 'No es un correo válido', error: true });

    } else {

      setShowError({ ...showError, error: false });

    }
  }

  const handleSubmit = async () => {

    if (showError.error) {

      setShowError({ ...showError, value: 'No es un correo válido', error: true });

    } else {

      await AuthServices.forgotPassword(email)
        .then(response => {
          console.log(response);
          setSuccessful(true);
        })
        .catch(error => {
          console.log(error);
          console.error(error.response.data);
          console.error(error.response.status);
          setSuccessful(false);
        })

    }

  }

  return (
    <>
      <HeaderHome header={header} />
      <div className='w-100'>
        <div className='container form bg-white form-password d-flex flex-column justify-content-evenly'>
          <div className='header-form'>
            <h2 className='p-3 form-title'><strong>Recuperación de clave</strong></h2>
            <span className='form-subtitle'>¡No te preocupes! Suele ocurrir.<p>Por favor ingresa el correo asociado con tu cuenta</p></span>
          </div>
          <article className='row g-3'>
            <div className='col-12'>
              <TextField sx={inputStyle} inputProps={{ style: montserratFamily }} id='name' label='Correo Electrónico'
                value={email}
                onChange={handleChange}
                onBlur={validate}
                onKeyUp={validate}
                placeholder='Correo Electrónico' margin='dense' fullWidth required />
            </div>
            {showError.error &&
              <div className='col-12'>
                <ErrorText error={showError.value} />
              </div>
            }
            {successful &&
              <div className='col-12'>
                <div className="successful-notice">
                  Enviamos un correo electrónico a <strong>{email}</strong>. Asi podrás restablecer tu contraseña.
                </div>
              </div>
            }
            <div className='col-12'>
              <SubmitButton actionForm={() => handleSubmit()} buttonStyle={buttonStyle} buttonText='Enviar' />
            </div>
          </article>
        </div>
      </div>
    </>
  )
}