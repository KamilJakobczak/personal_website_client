import { useState } from 'react';
import Button from '../Button';

const AddGenre: React.FC = () => {
  const [name, setName] = useState('');

  const handleSubmit = () => {
    console.log();
  };
  return (
    <div className='add_genre new'>
      <Button className='add_genre__button' text='go back' goBack={true} />
      <form action='' className='add_genre__form'>
        <div className='add_publisher__form_element'>
          <label htmlFor='name'>name</label>
          <input
            type='text'
            id='name'
            autoComplete='off'
            required
            value={name}
            // placeholder='type genre name'
            onChange={e => setName(e.target.value)}
          />
        </div>
        <Button className='add_genre__form_button' handleClick={handleSubmit} />
      </form>
    </div>
  );
};

export default AddGenre;
