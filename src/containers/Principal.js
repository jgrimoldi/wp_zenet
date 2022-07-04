import React, { Component } from 'react'
import '../assets/css/Login.css'
import brandLogo from '../assets/images/logo-brand.svg';
import { HeaderHome, LinkButtons, buttonStyle, textStyle } from '../components';

const header = {
  title: 'Bienvenido a company',
  subtitle: 'Lo hacemos por ti!'
}

export default class Principal extends Component {
  render() {
    return (
      <main className='container-fluid bg_gradient'>
        <section className='container text-center text-uppercase font-white'>
          <div className='vh-100 row justify-content-center'>
            <div className='col-sm-12 d-flex align-items-center justify-content-center'>
              <HeaderHome header = { header } />
              {/* <div>
                <h1 className='mb-0'><strong>BIENVENIDO A COMPANY</strong></h1>
                <span className='lead'>Lo hacemos por ti!</span>
              </div> */}
            </div>
            <div className='col-sm-12 d-flex align-items-center'>
              <img className='img-fluid mx-auto' src={brandLogo} alt="COMPANY LOGO" />
            </div>
            <div className='col-sm-12 d-flex flex-column align-items-center justify-content-center'>
              <LinkButtons linkStyle={ buttonStyle } linkText='Iniciar Sesión' link="i/login" />
              <div className='mt-1 p-2'><span className='d-block'>¿No tienes cuenta?</span><LinkButtons linkStyle={ textStyle } linkText='Registrate ahora' link="i/register" /> </div>
            </div>
          </div>
        </section>
      </main>
    )
  }
}
