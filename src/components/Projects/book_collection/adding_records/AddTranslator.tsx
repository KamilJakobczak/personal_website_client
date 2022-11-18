import { useState } from 'react';
import Button from '../Button';

const AddTranslator: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  return (
    <div className='add_translator new'>
      <Button className='add_translator__button' text='go back' goBack={true} />
      <form action='add_translator__form'>
        <div className='add_translator__form_element'>
          <label htmlFor='firstName'>first name:</label>
          <input
            type='text'
            id='firstName'
            autoComplete='off'
            required
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
          />
        </div>
        <div className='add_translator__form_element'>
          <label htmlFor='lastName'>last name:</label>
          <input
            type='text'
            id='lastName'
            autoComplete='off'
            required
            value={lastName}
            onChange={e => setLastName(e.target.value)}
          />
        </div>
        <Button className='add_translator__form_button' />
      </form>
    </div>
  );
};

export default AddTranslator;
