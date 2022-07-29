import React, { useState } from 'react';
import AuthServices from '../services/AuthServices'
import { TextField, Typography, FormControlLabel, Checkbox, Tooltip, ClickAwayListener } from '@mui/material';
import {
  montserratFamily,
  textStyle,
  buttonStyle,
  checkboxStyle,
  inputStyle,
  HeaderHome,
  LinkButtons,
  SubmitButton,
  ErrorText,
  PopUp,
  tooltipStyle
} from '../components';

export const header = {
  title: 'Bienvenido',
  subtitle: 'Crea tu cuenta'
}

export const Register = () => {

  const [name, setName] = useState({ value: '', error: null, tooltip: false });
  const [surname, setSurname] = useState({ value: '', error: null, tooltip: false });
  const [email, setEmail] = useState({ value: '', error: null, tooltip: false });
  const [password, setPassword] = useState({ value: '', error: null, tooltip: false });
  const [checked, setChecked] = useState(null);
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState({ value: '', error: null });
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (state, setState) => (event) => {
    setState({ ...state, value: event.target.value });
  }

  const handleCheck = (event) => {
    setChecked(event.target.checked);
  };

  const handleClose = () => {
    setIsSubmit(false);
  }

  const handleTooltipClose = () => {
    setName({ ...name, tooltip: false })
    setSurname({ ...surname, tooltip: false })
    setEmail({ ...email, tooltip: false })
    setPassword({ ...password, tooltip: false })
  };

  const handleValidate = (RegEx, state, setState, error) => {

    if (!RegEx.test(state.value)) {
      setState({ ...state, error: false, tooltip: true });
      return error;
    } else {
      setState({ ...state, error: true });
      return '';
    }
  }

  const validate = (event) => {
    const textRegEx = /^[a-zA-ZÀ-ÿ\s]{2,40}$/;
    const emailRegEx = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[+@$!%*?&])[A-Za-z\d@$!%*?+&]{8,}$/;

    const errores = {};
    const state = event.target.name;
    const value = event.target.value;

    if (!value) {
      setFormError({ ...formError, value: 'Al menos un campo esta vacío', error: true });
    } else {
      if (state === 'name') {
        errores.name = handleValidate(textRegEx, name, setName, 'No es un nombre válido');
      }
      if (state === 'surname') {
        errores.surname = handleValidate(textRegEx, surname, setSurname, 'No es un apellido válido');
      }
      if (state === 'email') {
        errores.email = handleValidate(emailRegEx, email, setEmail, 'No es un correo válido');
      }
      if (state === 'password') {
        errores.password = handleValidate(passwordRegex, password, setPassword, 'No es una contraseña válida');
      }
      setFormError({ ...formError, error: false });
    }

    if (errores) {
      setErrors(errores);
    }

  }

  const handleSubmit = async () => {

    if (checked) {
      if (name.error && surname.error && email.error && password.error) {
        await AuthServices.register(email.value, password.value, name.value, surname.value)
          .then(response => {

            setIsSubmit(true);

            setName({...name, value: ''});
            setSurname({...surname, value: ''});
            setEmail({...email, value: ''});
            setPassword({...password, value: ''});
          })
          .catch(error => {
            console.log(error.response.status);
            if (error.response) {
              console.error(error.response.data.error);
              setFormError({ ...formError, value: 'Ocurrio un error al registrarse', error: true });
            }
          })
      } else {
        setFormError({ ...formError, value: 'El formulario no puede enviarse', error: true });
      }
    } else {
      setFormError({ ...formError, value: 'Acepte los términos y condiciones', error: true });
    }

  }

  return (
    <>
      <HeaderHome header={header} />
      <div className='w-100 mt-3'>
        <PopUp name={name.value} surname={surname.value} show={isSubmit} close={handleClose}></PopUp>
        <div className='container pt-3 pb-3 form bg-white'>
          <h2 className='p-3 form-title'><strong>Registrate</strong></h2>
          {/* <form className='row g-3'> */}
          <div className='col-12'>
            <ClickAwayListener onClickAway={handleTooltipClose}>
              <Tooltip sx={tooltipStyle} placement='top-end' arrow disableFocusListener disableHoverListener disableTouchListener
                onClose={handleTooltipClose} open={name.tooltip}
                PopperProps={{
                  disablePortal: true,
                }}
                title='Puede contener: Mayúsculas, Minúsculas, Espacios y Tildes'>
                <TextField sx={inputStyle} inputProps={{ style: montserratFamily }} id='name' name='name' label='Nombre' value={name.value}
                  onChange={handleChange(name, setName)}
                  onKeyUp={(e) => validate(e)}
                  onBlur={(e) => validate(e)}
                  placeholder='Nombre' margin='dense' fullWidth required />
              </Tooltip>
            </ClickAwayListener>
            {!name.error && <span>{(errors.name)}</span>}

            <ClickAwayListener onClickAway={handleTooltipClose}>
              <Tooltip sx={tooltipStyle} placement='top-end' arrow disableFocusListener disableHoverListener disableTouchListener
                onClose={handleTooltipClose} open={surname.tooltip}
                PopperProps={{
                  disablePortal: true,
                }}
                title='Puede contener: Mayúsculas, Minúsculas, Espacios y Tildes'>
                <TextField sx={inputStyle} inputProps={{ style: montserratFamily }} id='surname' name='surname' label='Apellido' value={surname.value}
                  onChange={handleChange(surname, setSurname)}
                  onKeyUp={(e) => validate(e)}
                  onBlur={(e) => validate(e)}
                  placeholder='Apellido' margin='dense' fullWidth required />
              </Tooltip>
            </ClickAwayListener>
            {!surname.error && <span>{(errors.surname)}</span>}

            <ClickAwayListener onClickAway={handleTooltipClose}>
              <Tooltip sx={tooltipStyle} placement='top-end' arrow disableFocusListener disableHoverListener disableTouchListener
                onClose={handleTooltipClose} open={email.tooltip}
                PopperProps={{
                  disablePortal: true,
                }}
                title='Ej: user@example.com'>
                <TextField sx={inputStyle} inputProps={{ style: montserratFamily }} id='email' name='email' label='Correo Electrónico' value={email.value}
                  onChange={handleChange(email, setEmail)}
                  onKeyUp={(e) => validate(e)}
                  onBlur={(e) => validate(e)}
                  placeholder='Correo Electrónico' margin='dense' fullWidth required />
              </Tooltip>
            </ClickAwayListener>
            {!email.error && <span>{(errors.email)}</span>}

            <ClickAwayListener onClickAway={handleTooltipClose}>
              <Tooltip sx={tooltipStyle} placement='top-end' arrow disableFocusListener disableHoverListener disableTouchListener
                onClose={handleTooltipClose} open={password.tooltip}
                PopperProps={{
                  disablePortal: true,
                }}
                title='Debe contener: Mayúsculas, Minúsculas, Números y Símbolos'>
                <TextField sx={inputStyle} inputProps={{ style: montserratFamily }} id='password' name='password' label='Contraseña' value={password.value}
                  onChange={handleChange(password, setPassword)}
                  onKeyUp={(e) => validate(e)}
                  onBlur={(e) => validate(e)}
                  placeholder='Contraseña (8 a 64 carácteres)' margin='dense' fullWidth required />
              </Tooltip>
            </ClickAwayListener>
            {!password.error && <span>{(errors.password)}</span>}

          </div>
          {formError.error && <div className='col-12'>
            <ErrorText error={formError.value} />
          </div>}
          <div className='col-12'>
            <SubmitButton actionForm={() => handleSubmit()} buttonStyle={buttonStyle} buttonText='Crear cuenta' />
          </div>
          <div className='col-12'>
            <FormControlLabel label={<Typography sx={montserratFamily}><span className='w-100 text-muted text-nowrap fw-bolder'>Acepto <LinkButtons linkStyle={textStyle} linkText='Términos y Condiciones' link="../../terms" target='_blank' /></span></Typography>}
              control={
                <Checkbox id='terms' sx={checkboxStyle} checked={checked} onChange={handleCheck} label={'Acepto los términos y condiciones'} />
              }
            ></FormControlLabel>
          </div>
          {/* </form> */}

          <span className='text-muted'>¡Ya tengo cuenta! <LinkButtons linkStyle={textStyle} linkText='Iniciar Sesión' link="../Login" /></span>
        </div>
      </div>
    </>
  )
}