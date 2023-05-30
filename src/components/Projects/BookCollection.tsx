import { useState } from 'react';
import useCookies from 'react-cookie/cjs/useCookies';
import { Outlet } from 'react-router-dom';
import Navigation from './book_collection/Navigation';
import Search from './book_collection/Search';

const BookCollection: React.FC = () => {
  const [cookies, setCookie] = useCookies();
  console.log(cookies);
  const elements = [
    { id: 0, element: 'books' },
    { id: 1, element: 'authors' },
    { id: 2, element: 'publishers' },
  ];
  const [loggedIn, setLoggedIn] = useState(false);

  const adminNavElements = [{ id: 1, element: 'add' }];
  const userNavElements = [
    { id: 0, path: 'user', element: 'sign up' },
    { id: 1, path: 'user', element: 'log in' },
  ];
  const loggedInUserNavElements = [
    { id: 0, path: 'user', element: 'my books' },
    { id: 1, path: 'user', element: 'log out' },
  ];

  return (
    <div className='bookCollection'>
      <Navigation elements={elements} parentClass='bookCollection__main' />
      <Search />
      <Navigation
        elements={cookies.loggedIn ? loggedInUserNavElements : userNavElements}
        parentClass='bookCollection__user'
      />
      <Outlet />
    </div>
  );
};

export default BookCollection;
