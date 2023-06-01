import { useState, useEffect } from 'react';
import { Outlet, useLocation, useOutletContext } from 'react-router-dom';
import Navigation from './book_collection/Navigation';
import Search from './book_collection/Search';
import { useMutation, useQuery } from '@apollo/client';
import { CHECK_LOGIN } from '../../GraphQL/queries';
import { SIGNOUT } from '../../GraphQL/mutations';

type ContextType = {
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setUserRole: React.Dispatch<React.SetStateAction<string>>;
};

const BookCollection: React.FC = () => {
  const { error, loading, data } = useQuery(CHECK_LOGIN);

  const [loggedIn, setLoggedIn] = useState<boolean>();
  const [userRole, setUserRole] = useState('');

  const location = useLocation();

  const [
    logout,
    { error: errorLogout, loading: loadingLogout, data: dataLogout },
  ] = useMutation(SIGNOUT, {
    onCompleted(data) {
      console.log(data);
      setLoggedIn(data.signout.authenticated);
    },
  });

  useEffect(() => {
    if (data) {
      if (data.checkLogin) {
        setLoggedIn(data.checkLogin.authenticated);
        if (data.checkLogin.user) {
          setUserRole(data.checkLogin.user.role);
        }
      }
    }
  }, [data]);

  useEffect(() => {
    if (
      location.pathname === '/apps/collection' &&
      location.state &&
      location.state._isRedirect
    ) {
      setLoggedIn(false);
      setUserRole('');
    }
  }, [location]);

  const elements = [
    { id: 0, element: 'books' },
    { id: 1, element: 'authors' },
    { id: 2, element: 'publishers' },
  ];
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
      {!loading && (
        <Navigation
          elements={loggedIn ? loggedInUserNavElements : userNavElements}
          parentClass='bookCollection__user'
        />
      )}
      {userRole === 'ADMIN' && (
        <Navigation
          elements={adminNavElements}
          parentClass='bookCollection__admin'
        />
      )}
      <Outlet context={{ setLoggedIn, setUserRole }} />
    </div>
  );
};

export default BookCollection;

export function useStatus() {
  return useOutletContext<ContextType>();
}
