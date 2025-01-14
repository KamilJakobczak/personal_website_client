import React from 'react';
import ReactDOM from 'react-dom/client';
import { router } from './routes/router';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './state';
import { CookiesProvider } from 'react-cookie';
import { HelmetProvider } from 'react-helmet-async';
import './i18n';
import './style/main.scss';
const container = document.querySelector('#root');
if (!container) throw new Error('Failed to find the root element');
const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <CookiesProvider>
          <RouterProvider router={router} />
        </CookiesProvider>
      </Provider>
    </HelmetProvider>
  </React.StrictMode>
);
