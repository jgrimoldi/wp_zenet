import React from 'react';
import { Routes, Route } from 'react-router-dom';
import RequireAuth from './components/RequireAuth';

import Principal from './containers/Principal';
import Home from './containers/Home';
import { Login } from './containers/Login';
import { Register } from './containers/Register';
import { ForgotPassword } from './containers/ForgotPassword';
import { ResetPassword } from './containers/ResetPassword';
import Terms from './containers/Terms';
import Dashboard from './containers/Dashboard';


function Path() {
  return (
    <Routes>

      <Route path="/" element={<Principal />} />

      {/* Public routes */}
      <Route path="i" element={<Home />} >
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="forgotPassword" element={<ForgotPassword />} />
        <Route path="reset" element={<ResetPassword />} />
      </Route>
      <Route path="terms" element={<Terms />} />

      {/* Private routes */}
      <Route element={<RequireAuth allowedRoles={[1,2,3]} />} >
        <Route path="dashboard" element={<Dashboard />}>
          {/* Rutas del dashboard */}
        </Route>
      </Route>

      {/* All routes */}
      <Route path="*" />

    </Routes>
  );
}

export default Path;
