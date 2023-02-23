import Button from '../Button';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_PUBLISHER } from '../../../../GraphQL/mutations';
import { regexValidator } from '../handlers';
import Error from '../../../Error';
import SuccessMessage from '../SuccessMessage';
import LoadingSpinner from '../../../LoadingSpinner';
import { lastNameRegex, nameRegex, websiteRegex } from '../regex';

interface AddPublisherFormProps {
  goBackButton: boolean;
  className?: string;
  publisher?: string;
  onAdded?: React.Dispatch<React.SetStateAction<string>>;
}

const AddPublisherForm: React.FC<AddPublisherFormProps> = ({
  goBackButton,
  className,
  publisher,
  onAdded,
}) => {
  const [name, setName] = useState(publisher || '');
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
      onCompleted(data);
    },
  });

  const onCompleted = (data: any) => {
    if (data.addPublisher.userErrors[0].message) {
      setUserError(data.addPublisher.userErrors[0].message);
      onAdded && onAdded(' ');
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
      onAdded && onAdded(data.addPublisher.publisher.id);

      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    }
  };

  const handleTextInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, id } = e.target;

    switch (id) {
      case 'name':
        regexValidator(nameRegex, value, setName);
        break;
      case 'country':
        regexValidator(nameRegex, value, setCountry);
        break;
      case 'city':
        regexValidator(lastNameRegex, value, setCity);
        break;
      case 'street':
        regexValidator(lastNameRegex, value, setStreet);
        break;
      default:
        break;
    }
  };
  const handleWebsiteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    regexValidator(websiteRegex, value, setWebsite);
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
            autoComplete='nameOff'
            type='text'
            id='name'
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
              autoComplete='countryOff'
              type='text'
              id='country'
              required
              value={country}
              onChange={e => handleTextInputs(e)}
            />
          </div>
          <div className='address_item'>
            <label htmlFor='zipCode'>zipCode</label>
            <input
              autoComplete='zipCodeOff'
              type='text'
              id='zipCode'
              required
              value={zipCode}
              onChange={e => setZipCode(e.target.value)}
            />
          </div>
          <div className='address_item'>
            <label htmlFor='city'>city</label>
            <input
              autoComplete='cityOff'
              type='text'
              id='city'
              required
              value={city}
              onChange={e => handleTextInputs(e)}
            />
          </div>
          <div className='address_item'>
            <label htmlFor='street'>street</label>
            <input
              autoComplete='streetOff'
              type='text'
              id='street'
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
    <div className={`${className} addPublisher`}>
      <Button
        className='add_publisher__button'
        text='go back'
        goBack={goBackButton}
      />
      {data && successMessage ? (
        <SuccessMessage item='publisher' successMessage={successMessage} />
      ) : null}
      {loading && <LoadingSpinner />}
      {!loading && !successMessage ? showForm() : null}
      {showErrors()}
    </div>
  );
};

export default AddPublisherForm;
