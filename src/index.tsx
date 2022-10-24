import './style/main.scss';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { router } from './routes/router';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './state';

const container = document.querySelector('#root');
if (!container) throw new Error('Failed to find the root element');
const root = ReactDOM.createRoot(container);

root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
  // </React.StrictMode>
);
