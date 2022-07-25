import ReCAPTCHA from 'react-google-recaptcha';
import useAuth from '../hooks/useAuth';
import AuthServices from '../services/AuthServices'
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { TextField, FormControl, FormControlLabel, InputLabel, OutlinedInput, InputAdornment, Checkbox, IconButton, Typography } from '@mui/material';
import { Visibility, VisibilityOff, LoginRounded } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { montserratFamily, textStyle, buttonStyle, loadingButton, checkboxStyle, visibilityStyle, inputStyle, HeaderHome, LinkButtons, SubmitButton, ErrorText } from '../components';


export const header = {
  title: 'Bienvenido',
  subtitle: 'Ingrese a su cuenta para continuar'
}

export const Login = () => {

  // login values

  const initialValues = { email: '', password: '' };
  const formStates = { error: '', showErrors: false, isSubmit: false }
  const [formValues, setFormValues] = useState(initialValues);
  const [values, setValues] = useState(formStates);
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { email, password } = formValues;
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "../../dashboard";

  const handleChange = (prop) => (event) => {
    setFormValues({ ...formValues, [prop]: event.target.value });
  };

  const handleClickCheck = () => {
    setRememberMe(!rememberMe);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };


  const handleSubmit = async () => {

    const emailRegEx = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[+@$!%*?&])[A-Za-z\d@$!%*?+&]{8,}$/;

    // save atributes for rememberMe
    if (rememberMe) {
      localStorage.setItem('login', JSON.stringify([email, password]))
    } else if (!rememberMe && localStorage.getItem('login')) {
      localStorage.removeItem('login');
    }

    if (captcha.current.getValue()) {
      if (email === '' || password === '') {
        setValues({ ...values, showErrors: true, error: 'El correo y/o contraseña están vacíos', isSubmit: false });
      } else if (!emailRegEx.test(email)) {
        setValues({ ...values, showErrors: true, error: 'El correo no es correcto', isSubmit: false });
      } else if (password.length < 8) {
        setValues({ ...values, showErrors: true, error: 'La contraseña debe tener mas de 8 caractéres', isSubmit: false });
      } else if (!passwordRegex.test(password)) {
        setValues({ ...values, showErrors: true, error: 'La contraseña debe ser alfanumerica y contener símbolos', isSubmit: false });
      } else {
        setValues({ ...values, showErrors: false, isSubmit: true });
        await AuthServices.logIn(email, password)
          .then(response => {

            const accessToken = response?.data?.token;
            const roles = response?.data?.user.fk_perfil;
            const id = response?.data?.user.id;

            setAuth({ id, roles, email, password, accessToken });
            navigate(from, { replace: true });

          })
          .catch(error => {
            if (error.response) {
              console.error(error.response.data);
              setValues({ ...values, showErrors: true, error: 'Correo o contraseña incorrectos', isSubmit: false });
            }
          })
      }
    } else {
      setValues({ ...values, showErrors: true, error: 'Por favor acepta el captcha', isSubmit: false });
    }
  }

  useEffect(() => {
    if (localStorage.getItem('login')) {
      const valueForm = JSON.parse(localStorage.getItem('login'));
      setFormValues(formValues => ({ ...formValues, email: valueForm[0], password: valueForm[1] }));
    }
  }, [])

  // captcha values 
  const captcha = useRef(null);

  const handleCaptcha = () => {
    if (captcha.current.getValue()) {
      setValues({ ...values, showErrors: false, error: '' });
    }
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <HeaderHome header={header} />
      <div className='w-100 mt-3'>
        <div className='container pt-3 pb-3 form bg-white'>
          <h2 className='p-3 form-title'><strong>Inicio de sesion</strong></h2>
          {/* <form onSubmit={}> */}
          <div className='mt-2'>
            <TextField sx={inputStyle} inputProps={{ style: montserratFamily }} id='email' name='email' label='Usuario' value={formValues.email} onChange={handleChange('email')} placeholder='Ej: johndoe@mail.com' fullWidth required />
          </div>
          <div className='mt-4 mb-4'>
            <FormControl sx={inputStyle} variant='outlined' fullWidth required>
              <InputLabel htmlFor='password'>Contraseña</InputLabel>
              <OutlinedInput inputProps={{ style: montserratFamily }} id='password' name='password' label='Contraseña' value={formValues.password} onChange={handleChange('password')} placeholder='Al menos 8 caracteres. Una mayúscula, minúscula y un signo' type={showPassword ? 'text' : 'password'}
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
          <div className='recaptcha'>
            <ReCAPTCHA ref={captcha} sitekey='6LdmzbsgAAAAAOt3TP5VzgoMnkpZ-0_N9h3ZQBEx' onChange={handleCaptcha} />
          </div>
          {values.showErrors && <ErrorText error={values.error} />}
          {values.isSubmit ? < LoadingButton sx={loadingButton} loading loadingPosition='end' endIcon={<LoginRounded />} variant='outlined' fullWidth>Iniciando</LoadingButton>
            : <SubmitButton actionForm={() => handleSubmit()} buttonStyle={buttonStyle} buttonText='Iniciar Sesión' buttonName='login' />}
          <div className='m-2'>
            <FormControlLabel label={<Typography sx={montserratFamily}>Recordarme</Typography>} control={
              <Checkbox id='checked' name='checked' sx={checkboxStyle} checked={rememberMe} onChange={handleClickCheck} label={'Recordarme'} />
            }></FormControlLabel>
          </div>
          {/* </form> */}
          <LinkButtons linkStyle={textStyle} linkText='¿Has olvidado tu contraseña?' link="../forgotPassword" />
        </div>
      </div>
    </>
  )
}

const multipleExport = { header, Login };

export default multipleExport;