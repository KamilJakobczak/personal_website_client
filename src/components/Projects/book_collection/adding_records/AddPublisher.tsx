import Button from '../Button';
import { useState } from 'react';

const AddPublisher: React.FC = () => {
  const [name, setName] = useState('');
  const [website, setWebsite] = useState('');
  const [country, setCountry] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [city, setCity] = useState('');
  const [street, setStreet] = useState('');
  const [buildingNr, setBuildingNr] = useState('');
  const [placeNr, setPlaceNr] = useState('');

  const handleSubmit = () => {
    console.log('submit');
  };
  return (
    <div className='add_publisher new'>
      <Button className='add_publisher__button' text='go back' goBack={true} />
      <form className='add_publisher__form' action=''>
        <div className='add_publisher__form_element'>
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
        <div className='add_publisher__form_element'>
          <label htmlFor='website'>website</label>
          <input
            type='text'
            id='website'
            autoComplete='off'
            required
            value={website}
            onChange={e => setWebsite(e.target.value)}
          />
        </div>
        <div className='add_publisher__form_element__address'>
          <p>address</p>
          <div className='address_item'>
            <label htmlFor='country'>country</label>
            <input
              type='text'
              id='country'
              autoComplete='off'
              required
              value={country}
              onChange={e => setCountry(e.target.value)}
            />
          </div>
          <div className='address_item'>
            <label htmlFor='zipCode'>zipCode</label>
            <input
              type='text'
              id='zipCode'
              autoComplete='off'
              required
              value={zipCode}
              onChange={e => setZipCode(e.target.value)}
            />
          </div>
          <div className='address_item'>
            <label htmlFor='city'>city</label>
            <input
              type='text'
              id='city'
              autoComplete='off'
              required
              value={city}
              onChange={e => setCity(e.target.value)}
            />
          </div>
          <div className='address_item'>
            <label htmlFor='street'>street</label>
            <input
              type='text'
              id='street'
              autoComplete='off'
              required
              value={street}
              onChange={e => setStreet(e.target.value)}
            />
          </div>
          <div className='address_item'>
            <label htmlFor='buildingNr'>buildingNr</label>
            <input
              type='text'
              id='buildingNr'
              autoComplete='off'
              required
              value={buildingNr}
              onChange={e => setBuildingNr(e.target.value)}
            />
          </div>
          <div className='address_item'>
            <label htmlFor='placeNr'>placeNr</label>
            <input
              type='text'
              id='placeNr'
              autoComplete='off'
              required
              value={placeNr}
              onChange={e => setPlaceNr(e.target.value)}
            />
          </div>
        </div>
        <Button
          className='add_publisher__form_button'
          handleClick={handleSubmit}
        />
      </form>
    </div>
  );
};

export default AddPublisher;
