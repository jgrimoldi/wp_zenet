import React, { Component, useContext } from 'react'
import { apiUrl } from '../components';
import axios from 'axios';
import {useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthProvider';

export default class Dashboard extends Component {

  constructor() {
    super();

    this.state = {

      username: '',
      password: '',
      loadingUser: false,
      error: false,
    }
  }

  async componentDidMount() {
    const accessString = localStorage.getItem('JWT');

    if (accessString == null) {
      this.setState({ loadingUser: false, error: false });
    }

    await axios.get(apiUrl + '/auth/', { params: { username: this.state.username }, headers: { Authorization: `JWT ${accessString}` } })
      .then(response => {
        console.log("El access string: " + accessString)
        console.log(response.data.data);
      })
      .catch(error => {
        console.log(error.response.data);
      })
  }



  logout = async () => {
    // Esto no puede ir aca adentro, no se puede definir hooks en clases
    const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    setAuth({});
    navigate('/linkpage');
  }

  render() {
    return (
      <div>
        Hola soy el DASHBOARD
        <button onClick={this.logout}>Cerrar Sesion</button>
      </div>
    )
  }
}