import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import Path from './Path';
import { AuthProvider } from './context/AuthProvider'


const root = ReactDOM.createRoot(
  document.getElementById('root')
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Path />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);