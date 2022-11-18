import { useState } from 'react';
import Button from '../Button';

const AddAuthor: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [nationality, setNationality] = useState('');
  const [birth, setBirth] = useState('');
  const [death, setDeath] = useState('');
  const [wiki, setWiki] = useState('');
  const [goodreads, setGoodreads] = useState('');
  const [lubimyczytac, setLubimyczytac] = useState('');

  return (
    <div className='add_author new'>
      <Button className='add_author__button' text='go back' goBack={true} />
      <form action='add_author__form'>
        <div className='add_author__form_element'>
          <label htmlFor='firstName'>first name</label>
          <input
            type='text'
            id='firstName'
            autoComplete='off'
            required
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
          />
        </div>
        <div className='add_author__form_element'>
          <label htmlFor='lastName'>last name</label>
          <input
            type='text'
            id='lastName'
            autoComplete='off'
            required
            value={lastName}
            onChange={e => setLastName(e.target.value)}
          />
        </div>
        <div className='add_author__form_element'>
          <label htmlFor='nationality'>nationality</label>
          <input
            type='text'
            id='nationality'
            value={nationality}
            onChange={e => setNationality(e.target.value)}
          />
        </div>
        <div className='add_author__form_element'>
          <label htmlFor='birth'>born in</label>
          <input
            type='text'
            id='birth'
            value={birth}
            onChange={e => setBirth(e.target.value)}
          />
        </div>
        <div className='add_author__form_element'>
          <label htmlFor='death'>died in</label>
          <input
            type='text'
            id='death'
            value={death}
            onChange={e => setDeath(e.target.value)}
          />
        </div>
        <div className='add_author__form_element'>
          <label htmlFor='wiki'>Wikipedia</label>
          <input
            type='text'
            id='wiki'
            value={wiki}
            onChange={e => setWiki(e.target.value)}
          />
        </div>
        <div className='add_author__form_element'>
          <label htmlFor='goodreads'>goodreads</label>
          <input
            type='text'
            id='goodreads'
            value={goodreads}
            onChange={e => setGoodreads(e.target.value)}
          />
        </div>
        <div className='add_author__form_element'>
          <label htmlFor='lubimyczytac'>lubimyczytac</label>
          <input
            type='text'
            id='lubimyczytac'
            value={lubimyczytac}
            onChange={e => setLubimyczytac(e.target.value)}
          />
        </div>
        <Button className='add_author__form_button' />
      </form>
    </div>
  );
};

export default AddAuthor;
