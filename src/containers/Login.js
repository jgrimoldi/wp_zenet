import React, { useRef } from 'react';
import { TextField, FormControl, FormControlLabel, InputLabel, OutlinedInput, InputAdornment, Checkbox, IconButton, Typography } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { montserratFamily, textStyle, buttonStyle, checkboxStyle, visibilityStyle, inputStyle, HeaderHome, LinkButtons, SubmitButton, ErrorText, RegEx, apiUrl } from '../components';
import { Navigate } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';
import axios from 'axios';

export const header = {
  title: 'Bienvenido',
  subtitle: 'Ingrese a su cuenta para continuar'
}

export const Login = () => {

  const [values, setValues] = React.useState({
    username: '',
    password: '',
    showPassword: false,
    checked: false,
    loggedIn: false,
    error: '',
    showError: false,
    validateError: false,
  });

  const captcha = useRef(null);

  const handleCaptcha = () => {
    if (captcha.current.getValue()) {
      setValues({ ...values, showError: false });
    }
  }

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleClickCheck = () => {
    setValues({ ...values, checked: !values.checked });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const loginUser = async () => {

    const { username, password } = values

    if (username === '' || password === '') {
      setValues({ ...values, showError: true, error: 'El correo y/o contraseña están vacíos', loggedIn: false });
    } else {
      if (captcha.current.getValue()) {
        if (!RegEx.correo.test(username)) {
          setValues({ ...values, showError: true, error: 'El correo no es correcto', loggedIn: false });
        } else if (password.length < 8) {
          setValues({ ...values, showError: true, error: 'La contraseña debe tener mas de 8 caractéres', loggedIn: false });
        } else if (!RegEx.clave.test(password)) {
          setValues({ ...values, showError: true, error: 'La contraseña debe ser alfanumerica y contener símbolos', loggedIn: false });
        } else {
          await axios.post(apiUrl + '/auth/login', { email: username, password: password })
            .then(response => {
              return response.data;
            })
            .then(response => {
              localStorage.setItem('JWT', response.data.token);
              setValues({ ...values, showError: false, loggedIn: true });
            })
            .catch(error => {
              if (error.response.data) {
                console.error(error.response.data);
                setValues({ ...values, showError: true, error: 'Correo o contraseña incorrectos', loggedIn: false });
              }
            })
        }
      } else {
        setValues({ ...values, showError: true, error: 'Por favor acepta el captcha', loggedIn: false });
      }
    }
  }

  if (!values.loggedIn) {
    return (
      <>
        <HeaderHome header={header} />
        <div className='w-100 mt-3'>
          <div className='container pt-3 pb-3 form bg-white'>
            <h2 className='p-3 form-title'><strong>Inicio de sesion</strong></h2>
            {/* <form method='post' onSubmit={() => loginUser()}> */}
            <div className='mt-2'>
              <TextField sx={inputStyle} inputProps={{ style: montserratFamily }} id='username' name='username' label='Usuario' value={values.username} onChange={handleChange('username')} placeholder='Usuario' fullWidth required />
            </div>
            <div className='mt-4 mb-4'>
              <FormControl sx={inputStyle} variant='outlined' fullWidth required>
                <InputLabel htmlFor='password'>Contraseña</InputLabel>
                <OutlinedInput inputProps={{ style: montserratFamily }} id='password' name='password' label='Contraseña' value={values.password} onChange={handleChange('password')} type={values.showPassword ? 'text' : 'password'}
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
            <div className='recaptcha'>
              <ReCAPTCHA ref={captcha} sitekey='6LdmzbsgAAAAAOt3TP5VzgoMnkpZ-0_N9h3ZQBEx' onChange={handleCaptcha} />
            </div>
            {values.showError && <ErrorText error={values.error} />}
            <SubmitButton actionForm={() => loginUser()} buttonStyle={buttonStyle} buttonText='Iniciar Sesión' buttonName='login' />
            <div className='m-2'>
              <FormControlLabel label={<Typography sx={montserratFamily}>Recordarme</Typography>} control={
                <Checkbox id='checked' name='checked' sx={checkboxStyle} checked={values.checked} onChange={handleClickCheck} label={'Recordarme'} />
              }></FormControlLabel>
            </div>
            {/* </form> */}
            <LinkButtons linkStyle={textStyle} linkText='¿Has olvidado tu contraseña?' link="../forgotPassword" />
          </div>
        </div>
      </>
    )
  }
  return <Navigate to='../../dashboard' />
}

const multipleExport = { header, Login };

export default multipleExport;