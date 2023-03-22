import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { SIGNUP } from '../../../GraphQL/mutations';
import Button from './Button';

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

  return (
    <div className='signup-wrapper'>
      {/* <h5>log in</h5> */}
      <div className='signup_email'>
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
      <div className='signup_password'>
        <label htmlFor='password'>password</label>
        <input
          type='password'
          id='password'
          value={password}
          onChange={e => onPasswordChange(e)}
          required
        />
      </div>
      <div className='signup_username'>
        <label htmlFor='username'>username</label>
        <input
          type='text'
          id='username'
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />
      </div>
      <div className='signup_bio'>
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
        className='signup_submit'
        handleClick={handleSubmit}
      />
    </div>
  );
};

export default SignUp;
