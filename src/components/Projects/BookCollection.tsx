import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from './book_collection/Navigation';
import Search from './book_collection/Search';

const BookCollection: React.FC = () => {
  const elements = [
    { id: 0, element: 'books' },
    { id: 1, element: 'authors' },
    { id: 2, element: 'publishers' },
  ];
  const [loggedIn, setLoggedIn] = useState(false);
  const adminNavElements = [
    { id: 0, path: 'user', element: 'my books' },
    { id: 1, element: 'add' },
    { id: 2, path: 'user', element: 'logout' },
  ];
  const userNavElements = [
    { id: 0, path: 'user', element: 'sign up' },
    { id: 1, path: 'user', element: 'log in' },
  ];

  return (
    <div className='bookCollection'>
      <Navigation elements={elements} parentClass='bookCollection__main' />
      <Search />
      <Navigation
        elements={loggedIn ? adminNavElements : userNavElements}
        parentClass='bookCollection__user'
      />
      <Outlet />
    </div>
  );
};

export default BookCollection;
