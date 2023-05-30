import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { SIGNUP } from '../../../GraphQL/mutations';
import Button from './Button';
import LoadingSpinner from '../../LoadingSpinner';
import SuccessMessage from './SuccessMessage';
import Error from '../../Error';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [bio, setBio] = useState('');
  const [userError, setUserError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const [signup, { error, data, loading }] = useMutation(SIGNUP, {
    onCompleted(data) {
      console.log(data);
      if (data.signup.userErrors[0].message) {
        setUserError(data.signup.userErrors[0].message);
      }
      if (data.signup.token) {
        setSuccessMessage('User created');
      }
    },
  });
  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handleSubmit = () => {
    signup({
      variables: {
        name: username,
        bio,
        credentials: {
          email,
          password,
        },
      },
    });
  };

  const showForm = () => {
    return (
      <form className='signup__form'>
        <div className='signup__form_email'>
          <label htmlFor='username'>e-mail</label>
          <input
            type='text'
            id='email'
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder='will be used as a login'
            required
          />
        </div>
        <div className='signup__form_password'>
          <label htmlFor='password'>password</label>
          <input
            type='password'
            id='password'
            value={password}
            onChange={e => onPasswordChange(e)}
            required
          />
        </div>
        <div className='signup__form_username'>
          <label htmlFor='username'>username</label>
          <input
            type='text'
            id='username'
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
        </div>
        <div className='signup__form_bio'>
          <label htmlFor='bio'>bio</label>
          <textarea
            name='bio'
            id='bio'
            cols={10}
            rows={5}
            value={bio}
            onChange={e => setBio(e.target.value)}
            placeholder='optional'
          ></textarea>
        </div>
        <Button
          text='sign up'
          className='signup__form_submit'
          handleClick={handleSubmit}
        />
      </form>
    );
  };
  const showErrors = () => {
    if (error) {
      return <Error text={error.message} />;
    } else if (userError) {
      return <Error text={userError} />;
    }
  };

  return (
    <div>
      {loading && <LoadingSpinner />}
      {showErrors()}
      {data && successMessage ? (
        <SuccessMessage item='sign up' successMessage={successMessage} />
      ) : null}
      <div className='signup-wrapper'>
        {!loading && !successMessage ? showForm() : null}
      </div>
    </div>
  );
};

export default SignUp;
