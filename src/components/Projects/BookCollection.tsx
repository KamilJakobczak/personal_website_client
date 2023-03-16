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
  const [loggedIn, setLoggedIn] = useState(true);
  const adminNavElements = [
    { id: 0, element: 'mybooks' },
    { id: 1, element: 'add' },
    { id: 2, element: 'logout' },
  ];

  return (
    <div className='bookCollection'>
      <Navigation elements={elements} parentClass='bookCollection__main' />
      <Search />
      <Navigation
        elements={loggedIn ? adminNavElements : [{ id: 0, element: 'login' }]}
        parentClass='bookCollection__user'
      />
      <Outlet />
    </div>
  );
};

export default BookCollection;
