import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';
import Location from './Location';

const App: React.FC = () => {
  return (
    <>
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
