import { useState } from 'react';

import Button from '../general-purpose/Button';
import { useMutation } from '@apollo/client';
import { SIGNIN } from '../../../../../GraphQL/mutations';
import Error from '../../../../Error';
import LoadingSpinner from '../../../../LoadingSpinner';
import SuccessMessage from '../general-purpose/SuccessMessage';
import { useNavigate } from 'react-router-dom';
import { useStatus } from '../../../BookCollection';

const LogIn: React.FC = () => {
  const [email, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userError, setUserError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const { setLoggedIn, setUserRole } = useStatus();
  const navigate = useNavigate();

  const [signin, { error, data, loading }] = useMutation(SIGNIN, {
    onCompleted(data) {
      console.log(data);
      if (data.signin.userErrors[0].message) {
        setUserError(data.signin.userErrors[0].message);
      } else if (data.signin.user) {
        setSuccessMessage('You were successfully logged in');
        setLoggedIn(true);
        console.log(data.signin.user);
        setUserRole(data.signin.user.role);
        setTimeout(() => {
          navigate('/apps/collection');
        }, 1000);
      }
    },
  });

  const handleClick = () => {
    if (email === '' || password === '') {
      setUserError('Provide both username/email and password');
    }
    signin({
      variables: {
        credentials: {
          email,
          password,
        },
      },
    });
  };

  const showForm = () => {
    return (
      <form action=''>
        <div className='login_username'>
          <label htmlFor='username'>e-mail</label>
          <input
            type='text'
            id='username'
            value={email}
            onChange={e => setUsername(e.target.value)}
          />
        </div>
        <div className='login_password'>
          <label htmlFor='password'>password</label>
          <input
            type='password'
            id='password'
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
      </form>
    );
  };

  const showErrors = () => {
    if (userError) {
      return <Error text={userError} />;
    }
  };

  return (
    <div className='login-wrapper'>
      {loading && <LoadingSpinner />}
      {!loading && !successMessage && showForm()}
      {data && successMessage ? (
        <SuccessMessage successMessage={successMessage} />
      ) : null}
      {!successMessage && (
        <Button
          text='login'
          className='login_submit'
          handleClick={handleClick}
        />
      )}
      {userError && showErrors()}
    </div>
  );
};

export default LogIn;
