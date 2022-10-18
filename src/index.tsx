import './style/main.scss';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { router } from './routes/router';
import { RouterProvider } from 'react-router-dom';

const container = document.querySelector('#root');
if (!container) throw new Error('Failed to find the root element');
const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
