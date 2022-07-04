import React from 'react';
import { TextField, FormControl, FormControlLabel, InputLabel, OutlinedInput, InputAdornment, Checkbox, IconButton, Typography } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { montserratFamily, textStyle, buttonStyle, checkboxStyle, visibilityStyle, inputStyle, HeaderHome, LinkButtons, SubmitButton } from '../components';
import ReCAPTCHA from 'react-google-recaptcha';

export const header = {
  title: 'Bienvenido',
  subtitle: 'Ingrese a su cuenta para continuar'
}

export const Login = () => {

  const [checked, setChecked] = React.useState(false);

  const handleCheck = (event) => {
    setChecked(event.target.checked);
  };

  const [values, setValues] = React.useState({
    username: '',
    password: '',
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <HeaderHome header={header} />
      <div className='w-100 mt-3'>
        <div className='container pt-3 pb-3 form bg-white'>
          <h2 className='p-3 form-title'><strong>Inicio de sesion</strong></h2>
          <form>
            <div className='mt-2'>
              <TextField sx={inputStyle} id='username' label='Usuario' value={values.username} onChange={handleChange('username')} placeholder='Usuario' fullWidth required />
            </div>
            <div className='mt-4 mb-4'>
              <FormControl sx={inputStyle} variant='outlined' fullWidth required>
                <InputLabel htmlFor='password'>Contraseña</InputLabel>
                <OutlinedInput id='password' type={values.showPassword ? 'text' : 'password'} value={values.password} label='Contraseña'
                  onChange={handleChange('password')}
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
            <div className='recaptcha mb-3'>
              <ReCAPTCHA sitekey='6LdmzbsgAAAAAOt3TP5VzgoMnkpZ-0_N9h3ZQBEx' />
            </div>
            <SubmitButton buttonStyle={buttonStyle} buttonText='Iniciar Sesión' />
            <div className='m-2'>
              <FormControlLabel label={<Typography sx={montserratFamily}>Recordarme</Typography>} control={
                <Checkbox id='logged' sx={checkboxStyle} checked={checked} onChange={handleCheck} label={'Recordarme'} />
              }></FormControlLabel>
            </div>
          </form>
          <LinkButtons linkStyle={textStyle} linkText='¿Has olvidado tu contraseña?' link="../forgotPassword" />
        </div>
      </div>
    </>
  )
}

const multipleExport = { header, Login };

export default multipleExport;