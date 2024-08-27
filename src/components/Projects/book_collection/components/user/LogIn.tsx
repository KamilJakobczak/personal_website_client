import { useState, useEffect } from 'react';

import Button from '../general-purpose/Button';
import { useMutation } from '@apollo/client';
import { SIGNIN } from '../../../../../GraphQL/mutations';
import Error from '../../../../Error';
import LoadingSpinner from '../../../../LoadingSpinner';
import SuccessMessage from '../general-purpose/SuccessMessage';
import { useNavigate } from 'react-router-dom';
import { useStatus } from '../../../BookCollection';
import { getCookie } from '../../../../../utility/getCookie';

const LogIn: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userError, setUserError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const { setLoggedIn, setUserRole } = useStatus();
  const navigate = useNavigate();
  const controller = new AbortController();

  const [signin, { error, data, loading }] = useMutation(SIGNIN, {
    onCompleted(data) {
      console.log(data);
      if (data.signin.userErrors[0].message) {
        setUserError(data.signin.userErrors[0].message);
      } else if (data.signin.user) {
        setSuccessMessage('You were successfully logged in');
        controller.abort();
        setEmail('');
        setPassword('');
        setLoggedIn(true);
        setUserError('');
        console.log(data.signin.user);

        setUserRole(data.signin.user.role);
        setTimeout(() => {
          navigate('/apps/collection');
        }, 1000);
      }
    },
  });

  const handleSubmit = () => {
    console.log(email, password);
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

  useEffect(() => {
    const passwordInput = document.getElementById('password');

    if (passwordInput) {
      passwordInput.addEventListener(
        'keydown',
        e => {
          if (e.key === 'Enter') {
            handleSubmit();
          }
        },
        { signal: controller.signal }
      );
    }
    return () => {
      controller.abort();
    };
  }, [userError, controller]);

  const showForm = () => {
    return (
      <form action=''>
        <div className='login_username'>
          <label htmlFor='username'>e-mail</label>
          <input
            type='text'
            id='username'
            value={email}
            onChange={e => {
              setEmail(e.target.value);
              console.log(e.target.value);
              setUserError('');
            }}
          />
        </div>
        <div className='login_password'>
          <label htmlFor='password'>password</label>
          <input
            type='password'
            id='password'
            value={password}
            onChange={e => {
              setPassword(e.target.value);
              console.log(e.target.value);
              setUserError('');
            }}
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
          handleClick={handleSubmit}
        />
      )}
      {userError && showErrors()}
    </div>
  );
};

export default LogIn;
