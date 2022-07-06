import { Component } from 'react';
import brandLogo from '../assets/images/logo-brand.svg';

import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Outlet, useNavigate } from 'react-router-dom';

const GoBack = () => {
    const navigate = useNavigate();
    return (
        <div className='back-button'>
            <Button variant='text' onClick={() => navigate(-1)} size='medium' startIcon={<ArrowBackIcon />} >Volver</Button>
        </div>
    )
};

export default class Home extends Component {
    render() {
        return (
            <main className='full-height bg_gradient'>
                <GoBack />
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