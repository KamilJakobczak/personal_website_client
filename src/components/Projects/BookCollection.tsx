import { useState, useEffect } from 'react';
import { Outlet, useLocation, useOutletContext } from 'react-router-dom';
import Navigation from './book_collection/components/general-purpose/Navigation';
import Search from './book_collection/components/general-purpose/Search';
import { useMutation, useQuery } from '@apollo/client';
import { CHECK_LOGIN } from '../../GraphQL/queries';
import { SIGNOUT } from '../../GraphQL/mutations';
import { getCookie } from '../../utility/getCookie';

type ContextType = {
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setUserRole: React.Dispatch<React.SetStateAction<string>>;
  loggedIn: boolean;
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
      setUserRole('');
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
    { id: 0, path: 'user', element: 'profile' },
    { id: 2, path: 'user', element: 'log out', handler: logout },
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
      <Outlet context={{ setLoggedIn, setUserRole, loggedIn }} />
    </div>
  );
};

export default BookCollection;

export function useStatus() {
  return useOutletContext<ContextType>();
}
