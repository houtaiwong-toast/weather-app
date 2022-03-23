import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { App } from '~/components';

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/:zipCode" element={<App />} />
      <Route path="/" element={<App />} />
    </Routes>
  </BrowserRouter>
);

export default Router;
