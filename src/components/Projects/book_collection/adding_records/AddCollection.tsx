import { useState } from 'react';
import Button from '../Button';

const AddCollection: React.FC = () => {
  const [name, setName] = useState('');

  const handleSubmit = () => {
    console.log('collection submitted');
  };
  return (
    <div className='add_collection'>
      <Button className='add_collection__button' text='go back' goBack={true} />
      <form action='' className='add_collection__form'>
        <div className='add_collection__form_element'>
          <label htmlFor='name'>name</label>
          <input
            type='text'
            id='name'
            autoComplete='off'
            required
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>
        <Button
          className='add_collection__form_button'
          handleClick={handleSubmit}
        />
      </form>
    </div>
  );
};

export default AddCollection;
