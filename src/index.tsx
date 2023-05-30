import './style/main.scss';

import ReactDOM from 'react-dom/client';
import { router } from './routes/router';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './state';
import { CookiesProvider } from 'react-cookie';

const container = document.querySelector('#root');
if (!container) throw new Error('Failed to find the root element');
const root = ReactDOM.createRoot(container);

root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <CookiesProvider>
      <RouterProvider router={router} />
    </CookiesProvider>
  </Provider>
  // </React.StrictMode>
);
