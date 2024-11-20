import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';
import { Helmet } from 'react-helmet-async';
import { imageApi } from '../server';

const App: React.FC = () => {
  return (
    <>
      <Helmet>
        {/* <meta
          httpEquiv='Content-Security-Policy'
          content={`
            // img-src 'self' ${imageApi}/* data: blob:;
      `}
        ></meta> */}
      </Helmet>
      <Header />

      {/* <Location /> */}
      <div id='apps'>
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default App;
