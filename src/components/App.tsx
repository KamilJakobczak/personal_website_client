import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';

const App: React.FC = () => {
  return (
    <>
      <Header />
      <div id='apps'>
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default App;
