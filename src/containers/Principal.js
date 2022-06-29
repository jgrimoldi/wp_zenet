import React, { Component } from 'react'
import LinkButtons from '../components/LinkButtons';
import brandLogo from '../assets/images/logo-brand.svg';

export default class Principal extends Component {
  render() {
    return (
      <main className='container-fluid bg-gradient'>
        <section className='container'>
          <div className='row justify-content-center'>
            <div className='col-sm-12 mr-auto'>
              <h1>BIENVENIDO A COMPANY</h1>
              <span>Lo hacemos por ti!</span>
            </div>
            <div className='col-sm-12 mr-auto'>
              <img src={ brandLogo } alt="COMPANY LOGO" />
            </div>
            <div className='col-sm-12 mr-auto'>
              <LinkButtons buttonText='Iniciar Sesión' link="i/login" />
            </div>
          </div>
        </section>
      </main>
    )
  }
}
