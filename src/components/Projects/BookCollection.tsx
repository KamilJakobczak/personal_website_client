import { useState, useEffect } from 'react';
import { Outlet, useOutletContext } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';

import Navigation from './book_collection/components/general-purpose/Navigation';
import Search from './book_collection/components/general-purpose/Search';

import { CHECK_LOGIN } from '../../GraphQL/queries';
import { SIGNOUT } from '../../GraphQL/mutations';

type ContextType = {
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setUserRole: React.Dispatch<React.SetStateAction<string>>;
  loggedIn: boolean;
};

const BookCollection: React.FC = () => {
  const { loading, data } = useQuery(CHECK_LOGIN);

  const [loggedIn, setLoggedIn] = useState<boolean>();
  const [userRole, setUserRole] = useState('');

  const [logout] = useMutation(SIGNOUT, {
    onCompleted(data) {
      console.log(data);
      setLoggedIn(false);
      setUserRole('');
    },
  });

  useEffect(() => {
    if (data?.checkLogin) {
      setLoggedIn(data.checkLogin.authenticated);
      if (data.checkLogin.user) {
        setUserRole(data.checkLogin.user.role);
      }
    }
  }, [data]);

  const elements = [
    { id: 0, element: 'books' },
    { id: 1, element: 'authors' },
    { id: 2, element: 'publishers' },
  ];
  const adminNavElements = [
    { id: 0, element: 'add' },
    { id: 1, element: 'genres' },
    { id: 2, element: 'translators' },
    { id: 3, element: 'book series' },
  ];
  const userNavElements = [
    { id: 0, path: 'user', element: 'sign up' },
    { id: 1, path: 'user', element: 'log in' },
  ];
  const loggedInUserNavElements = [
    { id: 0, path: 'user', element: 'profile' },
    { id: 2, path: 'user', element: 'log out', handler: logout },
  ];

  return (
    <div className='bookCollection'>
      <Navigation elements={elements} parentClass='bookCollection__main' />
      <Search />
      {userRole === 'ADMIN' && <Navigation elements={adminNavElements} parentClass='bookCollection__admin' />}
      {!loading && (
        <Navigation
          elements={loggedIn ? loggedInUserNavElements : userNavElements}
          parentClass='bookCollection__user'
        />
      )}

      <Outlet context={{ setLoggedIn, setUserRole, loggedIn }} />
    </div>
  );
};

export default BookCollection;

export function useStatus() {
  return useOutletContext<ContextType>();
}
