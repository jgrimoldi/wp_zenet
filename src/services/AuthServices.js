import axios from 'axios';

const API_URL = 'http://45.227.219.14:3001/api/auth/';

const getUsers = (accessToken) => {
    return (
        axios.get(API_URL, { headers: { Authorization: `JWT ${accessToken}` } })
            .then(response => {
                return response.data;
            })
    )
}

const getUserById = (id, accessToken) => {
    return (
        axios.get(API_URL + id, { headers: { Authorization: `JWT ${accessToken}` } })
            .then(response => {
                return response.data;
            })
    )
}

const register = (email, password, nombre, apellido) => {
    const fk_perfil = "1";
    const fk_empresa = "12345678";
    return (
        axios.post(API_URL + 'register', { email, password, nombre, apellido, fk_perfil, fk_empresa })
            .then(response => {
                return response.data;
            })
    )
}

const logIn = (email, password) => {
    return (
        axios.post(API_URL + 'login', { email: email, password: password })
            .then(response => {
                return response.data;
            })
    )
}

const forgotPassword = (email) => {
    return (
        axios.post(API_URL + 'forgotPassword', { email })
            .then(response => {
                return response.data
            })
    )
}

const resetPassword = (token) => {
    return(
        axios.get(API_URL + 'reset', {params: {resetPasswordToken: token}})
        .then(response => {
            return response.data
        })
    )
}

const updateViaEmail = (email, password, token) =>{
    return(
        axios.put(API_URL + 'updatePasswordViaEmail', {email, password, resetPasswordToken: token})
    )
}


const AuthServices = {
    getUsers,
    getUserById,
    register,
    logIn,
    forgotPassword,
    resetPassword,
    updateViaEmail
}

export default AuthServices;