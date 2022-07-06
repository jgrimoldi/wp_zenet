import { Component } from 'react';
import { Outlet } from 'react-router-dom';
import brandLogo from '../assets/images/logo-brand.svg';

export default class Home extends Component {
    render() {
        return (
            <main className='full-height bg_gradient'>
                <section className='text-center text-uppercase font-white'>
                        <div className='p-3'>
                            <img className='img-fluid mx-auto' src={brandLogo} alt="COMPANY LOGO" />
                        </div>
                        <Outlet />
                </section>
            </main>
        )
    }
}