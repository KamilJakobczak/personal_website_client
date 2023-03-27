import { useState } from 'react';

import Button from './Button';

const LogIn: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const showForm = () => {
    return (
      <form action=''>
        <div className='login_username'>
          <label htmlFor='username'>e-mail</label>
          <input
            type='text'
            id='username'
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </div>
        <div className='login_password'>
          <label htmlFor='password'>password</label>
          <input
            type='password'
            id='password'
            value={password}
            onChange={e => onPasswordChange(e)}
          />
        </div>
      </form>
    );
  };

  return (
    <div className='login-wrapper'>
      <Button text='login' className='login_submit' />
    </div>
  );
};

export default LogIn;
