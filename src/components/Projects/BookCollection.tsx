import { useState, useEffect } from 'react';
import { Outlet, useOutletContext } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';

import Navigation from './book_collection/components/general-purpose/Navigation';
import Search from './book_collection/components/general-purpose/Search';

import { CHECK_LOGIN } from '../../GraphQL/queries';
import { SIGNOUT } from '../../GraphQL/mutations';
import { useTranslation } from 'react-i18next';

type ContextType = {
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setUserRole: React.Dispatch<React.SetStateAction<string>>;
  loggedIn: boolean;
};

const BookCollection: React.FC = () => {
  const { t } = useTranslation();
  const { loading, data } = useQuery(CHECK_LOGIN);

  const [loggedIn, setLoggedIn] = useState<boolean>();
  const [userRole, setUserRole] = useState('');

  const [logout] = useMutation(SIGNOUT, {
    onCompleted(data) {
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
    { id: 0, element: 'books', text: `${t('books')}` },
    { id: 1, element: 'authors', text: `${t('authors')}` },
    { id: 2, element: 'publishers', text: `${t('publishers')}` },
  ];
  const adminNavElements = [
    { id: 0, element: 'add', text: `${t('add')}` },
    { id: 1, element: 'genres', text: `${t('genres')}` },
    { id: 2, element: 'translators', text: `${t('translators')}` },
    { id: 3, element: 'bookseries', text: `${t('bookSeries')}` },
  ];
  const userNavElements = [
    { id: 0, path: 'user', element: 'signup', text: `${t('signUp')}` },
    { id: 1, path: 'user', element: 'login', text: `${t('logIn')}` },
  ];
  const loggedInUserNavElements = [
    { id: 0, path: 'user', element: 'profile', text: `${t('profile')}` },
    { id: 2, path: 'user', element: 'logout', text: `${t('logOut')}`, handler: logout },
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
