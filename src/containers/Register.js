import React from 'react';
import { TextField, Typography, FormControlLabel, Checkbox } from '@mui/material';
import {
  montserratFamily,
  textStyle,
  buttonStyle,
  checkboxStyle,
  inputStyle,
  HeaderHome,
  LinkButtons,
  SubmitButton,
  ErrorText
} from '../components';

export const header = {
  title: 'Bienvenido',
  subtitle: 'Crea tu cuenta'
}

export const Register = () => {

  const [checked, setChecked] = React.useState(false);

  const handleCheck = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <>
      <HeaderHome header={header} />
      <div className='w-100'>
        <div className='container form bg-white'>
          <form className='row g-3'>
            <div className='col-12'>
              <TextField sx={inputStyle} inputProps={{ style: montserratFamily }} id='name' label='Nombre' placeholder='Nombre' margin='dense' fullWidth required />
              <TextField sx={inputStyle} inputProps={{ style: montserratFamily }} id='surname' label='Apellido' placeholder='Apellido' margin='dense' fullWidth required />
              <TextField sx={inputStyle} inputProps={{ style: montserratFamily }} id='email' label='Correo Electrónico' placeholder='Correo Electrónico' margin='dense' fullWidth required />
              <TextField sx={inputStyle} inputProps={{ style: montserratFamily }} id='password' label='Contraseña' placeholder='Contraseña' margin='dense' fullWidth required />
            </div>
            <div className='col-12'>
              <ErrorText error='El correo ya ha sido tomado' />
            </div>
            <div className='col-12'>
              <SubmitButton buttonStyle={buttonStyle} buttonText='Crear cuenta' />
            </div>
            <div className='col-12'>
              <FormControlLabel label={<Typography sx={montserratFamily}><span className='w-100 text-muted text-nowrap fw-bolder'>Acepto <LinkButtons linkStyle={textStyle} linkText='Términos y Condiciones' link="../../terms" target='_blank' /></span></Typography>}
                control={
                  <Checkbox id='terms' sx={checkboxStyle} checked={checked} onChange={handleCheck} label={'Acepto los términos y condiciones'} />
                }
              ></FormControlLabel>
            </div>
          </form>

          <span className='text-muted'>¡Ya tengo cuenta! <LinkButtons linkStyle={textStyle} linkText='Iniciar Sesión' link="../Login" /></span>
        </div>
      </div>
    </>
  )
}