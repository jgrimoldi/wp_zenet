import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './containers/Home';

function Path() {
  return (
      <Routes>
        <Route path="/" element={ <Home /> }></Route>
      </Routes>
  );
}

export default Path;
