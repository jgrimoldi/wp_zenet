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

const logIn = (username, password) => {
    return (
        axios.post(API_URL + 'login', { email: username, password: password })
            .then(response => {
                return response.data;
            })
    )
}

const forgotPassword = () => {

}

const AuthServices = {
    getUsers,
    getUserById,
    register,
    logIn,
    forgotPassword
}

export default AuthServices;