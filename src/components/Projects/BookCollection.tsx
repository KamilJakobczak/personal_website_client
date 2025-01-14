import { useState, useEffect } from 'react';
import { Outlet, useOutletContext } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';

import Navigation from './book_collection/components/general-purpose/Navigation';
import Search from './book_collection/components/general-purpose/Search';

import { CHECK_LOGIN } from '../../GraphQL/queries';
import { SIGNOUT } from '../../GraphQL/mutations';
import { LANGUAGES } from './book_collection/languages';
import { useTranslation } from 'react-i18next';

type ContextType = {
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setUserRole: React.Dispatch<React.SetStateAction<string>>;
  loggedIn: boolean;
};

const BookCollection: React.FC = () => {
  const { loading, data } = useQuery(CHECK_LOGIN);

  const [loggedIn, setLoggedIn] = useState<boolean>();
  const [userRole, setUserRole] = useState('');

  const { i18n, t } = useTranslation();

  const onChangeLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const lang_code = e.target.value;
    i18n.changeLanguage(lang_code);
  };

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
    { id: 0, element: `${t('books')}` },
    { id: 1, element: `${t('authors')}` },
    { id: 2, element: `${t('publishers')}` },
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
      {
        <select defaultValue={i18n.language} onChange={e => onChangeLanguage(e)}>
          {LANGUAGES.map(({ code, label }) => (
            <option key={code} value={code}>
              {label}
            </option>
          ))}
        </select>
      }

      <Outlet context={{ setLoggedIn, setUserRole, loggedIn }} />
    </div>
  );
};

export default BookCollection;

export function useStatus() {
  return useOutletContext<ContextType>();
}
