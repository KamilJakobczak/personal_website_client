// Hooks and main libraries
import { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { useStatus } from '../../../BookCollection';
// Components
import Button from '../general-purpose/Button';
import Error from '../../../../CustomError';
import LoadingSpinner from '../../../../LoadingSpinner';
import SuccessMessage from '../general-purpose/SuccessMessage';
// GraphQL
import { SIGNIN } from '../../../../../GraphQL/mutations';

const LogIn: React.FC = () => {
  const navigate = useNavigate();
  const controller = new AbortController();
  const { setLoggedIn, setUserRole } = useStatus();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userError, setUserError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // GraphQL mutation for signing in
  const [signin, { error, data, loading }] = useMutation(SIGNIN, {
    onCompleted(data) {
      if (data.signin.userErrors[0].message) {
        setUserError(data.signin.userErrors[0].message);
      } else if (data.signin.user) {
        setSuccessMessage('You were successfully logged in');
        controller.abort();
        setEmail('');
        setPassword('');
        setLoggedIn(true);
        setUserError('');
        setUserRole(data.signin.user.role);
        setTimeout(() => {
          navigate('/apps/collection');
        }, 1000);
      }
    },
  });
  // Function to handle form submission
  const handleSubmit = () => {
    if (!email || !password) {
      setUserError('Provide both username/email and password');
      return;
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
  // Effect to handle "Enter" key press for form submission
  useEffect(() => {
    const handleEnterKey = (e: KeyboardEvent) => {
      if (e.key === 'Enter') handleSubmit();
    };
    const passwordInput = document.getElementById('password');
    if (passwordInput) {
      passwordInput.addEventListener('keydown', handleEnterKey, { signal: controller.signal });
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
      {successMessage ? (
        <SuccessMessage successMessage={successMessage} />
      ) : (
        <Button text='login' className='login_submit' handleClick={handleSubmit} />
      )}
      {userError && showErrors()}
    </div>
  );
};

export default LogIn;
