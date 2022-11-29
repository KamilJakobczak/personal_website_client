import Button from '../Button';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_PUBLISHER } from '../../../../GraphQL/mutations';
import { regexValidator } from '../handlers/regexValidator';
import Error from '../../../Error';
import SuccessMessage from '../SuccessMessage';
import LoadingSpinner from '../../../LoadingSpinner';

const AddPublisher: React.FC = () => {
  const [name, setName] = useState('');
  const [website, setWebsite] = useState('');
  const [country, setCountry] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [city, setCity] = useState('');
  const [street, setStreet] = useState('');
  const [buildingNr, setBuildingNr] = useState('');
  const [placeNr, setPlaceNr] = useState('');
  const [userError, setUserError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const [addPublisher, { data, loading, error }] = useMutation(ADD_PUBLISHER, {
    onCompleted(data) {
      if (data.addPublisher.userErrors[0].message) {
        setUserError(data.addPublisher.userErrors[0].message);
      }
      if (data.addPublisher.publisher) {
        setName('');
        setWebsite('');
        setCountry('');
        setZipCode('');
        setCity('');
        setStreet('');
        setBuildingNr('');
        setPlaceNr('');
        setUserError('');
        setSuccessMessage(data.addPublisher.publisher.name);

        setTimeout(() => {
          setSuccessMessage('');
        }, 3000);
      }
    },
  });

  const handleTextInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
    const regex = /^([ \u00c0-\u01ffa-zA-Z'-])+$/gm;
    const { value, id } = e.target;

    switch (id) {
      case 'name':
        regexValidator(regex, value, setName);
        break;
      case 'country':
        regexValidator(regex, value, setCountry);
        break;
      case 'city':
        regexValidator(regex, value, setCity);
        break;
      case 'street':
        regexValidator(regex, value, setStreet);
        break;
      default:
        break;
    }
  };
  const handleWebsiteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const regex =
      /^(https?:\/\/)?([\w\d_]+)\.([\w\d_.]+)\/?\??([^#\n\r]*)?#?([^\n\r]*)/gm;

    regexValidator(regex, value, setWebsite);
  };

  const handleSubmit = () => {
    addPublisher({
      variables: {
        name,
        website,
        address: {
          country,
          zipCode,
          city,
          street,
          buildingNr,
          placeNr,
        },
      },
    });
  };

  const showForm = () => {
    return (
      <form className='add_publisher__form' action='' autoComplete='off'>
        <div className='add_publisher__form_element'>
          <label htmlFor='name'>name</label>
          <input
            type='text'
            id='name'
            autoComplete='do-not-autofill'
            required
            value={name}
            onChange={e => handleTextInputs(e)}
          />
        </div>
        <div className='add_publisher__form_element'>
          <label htmlFor='website'>website</label>
          <input
            type='text'
            id='website'
            autoComplete='do-not-autofill'
            required
            value={website}
            onChange={e => handleWebsiteChange(e)}
          />
        </div>
        <div className='add_publisher__form_element__address'>
          <p>address</p>
          <div className='address_item'>
            <label htmlFor='country'>country</label>
            <input
              type='text'
              id='country'
              autoComplete='do-not-autofill'
              required
              value={country}
              onChange={e => handleTextInputs(e)}
            />
          </div>
          <div className='address_item'>
            <label htmlFor='zipCode'>zipCode</label>
            <input
              type='text'
              id='zipCode'
              autoComplete='do-not-autofill'
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
              autoComplete='do-not-autofill'
              required
              value={city}
              onChange={e => handleTextInputs(e)}
            />
          </div>
          <div className='address_item'>
            <label htmlFor='street'>street</label>
            <input
              type='text'
              id='street'
              autoComplete='do-not-autofill'
              required
              value={street}
              onChange={e => handleTextInputs(e)}
            />
          </div>
          <div className='address_item'>
            <label htmlFor='buildingNr'>buildingNr</label>
            <input
              type='text'
              id='buildingNr'
              autoComplete='do-not-autofill'
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
              autoComplete='do-not-autofill'
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
    <div className='add_publisher new'>
      <Button className='add_publisher__button' text='go back' goBack={true} />
      {data && successMessage ? (
        <SuccessMessage item='publisher' successMessage={successMessage} />
      ) : null}
      {loading && <LoadingSpinner />}
      {!loading && !successMessage ? showForm() : null}
      {showErrors()}
    </div>
  );
};

export default AddPublisher;
