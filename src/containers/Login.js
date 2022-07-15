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
  const [formValues, setFormValues] = useState(initialValues);
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState('');
  const [showErrors, setShowErrors] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
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


  const handleSubmit = (event) => {
    event.preventDefault();

    setErrors(validate(formValues));
    if (!errors) {
      setIsSubmit(true);
    }
  }

  useEffect(() => {
    console.log(errors);
    if (!errors && isSubmit) {
      AuthServices.logIn(email, password)
        .then(response => {
          const accessToken = response?.data?.token;
          const roles = response?.data?.user.fk_perfil;
          const id = response?.data?.user.id;
          // save atributes for rememberMe
          if (rememberMe) {
            console.log(rememberMe);
            localStorage.setItem('login', JSON.stringify([email, password]))
          } else {
            localStorage.removeItem('login');
          }
          setAuth({ id, roles, email, password, accessToken });
          navigate(from, { replace: true });
        })
        .catch(error => {
          if (error.response) {
            setIsSubmit(false);
            console.error(error.response.data);
          }
        })
    }
  }, [errors])

  const validate = (values) => {

    const emailRegEx = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[+@$!%*?&])[A-Za-z\d@$!%*?+&]{8,}$/;

    if (!captcha.current.getValue()) {
      setShowErrors(true);
      return 'Acepta el captcha para continuar';
    }

    if (!values.email || !values.password) {
      setShowErrors(true);
      return 'El correo y/o contraseña son necesarios';
    } else if (!emailRegEx.test(values.email)) {
      setShowErrors(true);
      return 'Debe colocar un correo válido';
    } else if (values.password.length < 8) {
      setShowErrors(true);
      return 'La contraseña debe tener mas de 8 caractéres';
    } else if (!passwordRegex.test(values.password)) {
      setShowErrors(true);
      return 'La contraseña debe ser alfanumerica y contener símbolos';
    } else {
      setShowErrors(false);
    }
  }

  // captcha values 
  const captcha = useRef(null);

  const handleCaptcha = () => {
    if (captcha.current.getValue()) {
      setShowErrors(false);
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
          <form onSubmit={handleSubmit}>
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
            {showErrors && <ErrorText error={errors} />}
            {isSubmit ? < LoadingButton sx={loadingButton} loading loadingPosition='end' endIcon={<LoginRounded />} variant='outlined' fullWidth>Iniciando</LoadingButton>
              : <SubmitButton buttonStyle={buttonStyle} buttonText='Iniciar Sesión' buttonName='login' />}
            <div className='m-2'>
              <FormControlLabel label={<Typography sx={montserratFamily}>Recordarme</Typography>} control={
                <Checkbox id='checked' name='checked' sx={checkboxStyle} checked={rememberMe} onChange={handleClickCheck} label={'Recordarme'} />
              }></FormControlLabel>
            </div>
          </form>
          <LinkButtons linkStyle={textStyle} linkText='¿Has olvidado tu contraseña?' link="../forgotPassword" />
        </div>
      </div>
    </>
  )
}


// const { username, password } = values

// if (username === '' || password === '') {
//     setValues({ ...values, showError: true, error: 'El correo y/o contraseña están vacíos', loggedIn: false });
// } else {
//     if (captcha.current.getValue()) {
//         if (!RegEx.correo.test(username)) {
//             setValues({ ...values, showError: true, error: 'El correo no es correcto', loggedIn: false });
//         } else if (password.length < 8) {
//             setValues({ ...values, showError: true, error: 'La contraseña debe tener mas de 8 caractéres', loggedIn: false });
//         } else if (!RegEx.clave.test(password)) {
//             setValues({ ...values, showError: true, error: 'La contraseña debe ser alfanumerica y contener símbolos', loggedIn: false });
//         } else {
//             await AuthServices.logIn(username, password)
//                 .then(response => {

//                     const accessToken = response?.data?.token;
//                     const roles = response?.data?.user.fk_perfil;
//                     const id = response?.data?.user.id;

//                     setAuth({ id, roles, username, password, accessToken });
//                     setValues({ ...values, showError: false, loggedIn: true, loginLoading: true });
//                     navigate(from, { replace: true });

//                 })
//                 .catch(error => {
//                     if (error.response) {
//                         console.error(error.response.data);
//                         setValues({ ...values, showError: true, error: 'Correo o contraseña incorrectos', loggedIn: false, loginLoading: false });
//                     }
//                 })
//         }
//     } else {
//         setValues({ ...values, showError: true, error: 'Por favor acepta el captcha', loggedIn: false });
//     }
// }

const multipleExport = { header, Login };

export default multipleExport;