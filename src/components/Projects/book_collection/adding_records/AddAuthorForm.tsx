import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { ADD_AUTHOR } from '../../../../GraphQL/mutations';
import Error from '../../../Error';
import LoadingSpinner from '../../../LoadingSpinner';
import Button from '../Button';
import { invalidValue, regexValidator } from '../handlers';
import { lastNameRegex, nameRegex, numbersRegex, websiteRegex } from '../regex';
import SuccessMessage from '../SuccessMessage';

interface AddAuthorFormProps {
  goBackButton: boolean;
  className: string;
  author?: {
    firstName: string;
    secondName: string;
    thirdName: string;
    lastName: string;
  };
  onAdded?: React.Dispatch<React.SetStateAction<string[]>>;
}

const AddAuthorForm: React.FC<AddAuthorFormProps> = ({
  goBackButton,
  className,
  author,
  onAdded,
}) => {
  const [firstName, setFirstName] = useState(author?.firstName || '');
  const [lastName, setLastName] = useState(author?.lastName || '');
  const [secondName, setSecondName] = useState(author?.secondName || '');
  const [thirdName, setThirdName] = useState(author?.thirdName || '');
  const [nationality, setNationality] = useState('');
  const [birthYear, setBirthYear] = useState('');
  const [deathYear, setDeathYear] = useState('');
  const [wiki, setWiki] = useState('');
  const [goodreads, setGoodreads] = useState('');
  const [lubimyczytac, setLubimyczytac] = useState('');

  const [userError, setUserError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const [addAuthor, { data, loading, error }] = useMutation(ADD_AUTHOR, {
    onCompleted(data) {
      onCompleted(data);
    },
  });

  const onCompleted = (data: any) => {
    if (data.addAuthor.userErrors[0].message) {
      setUserError(data.addAuthor.userErrors[0].message);
      onAdded && onAdded(prevState => [...prevState, ' ']);
    }
    if (data.addAuthor.author) {
      setFirstName('');
      setSecondName('');
      setThirdName('');
      setLastName('');
      setNationality('');
      setBirthYear('');
      setDeathYear('');
      setWiki('');
      setGoodreads('');
      setLubimyczytac('');
      setUserError('');
      setSuccessMessage(
        data.addAuthor.author.firstName + ' ' + data.addAuthor.author.lastName
      );
      onAdded && onAdded(prevState => [...prevState, data.addAuthor.author.id]);

      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    }
  };

  const handleInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
    const element = e.target;
    const { id, value } = element;
    switch (id) {
      case 'firstName':
        regexValidator(nameRegex, value, setFirstName);
        break;
      case 'secondName':
        regexValidator(nameRegex, value, setSecondName);
        break;
      case 'thirdName':
        regexValidator(nameRegex, value, setThirdName);
        break;
      case 'lastName':
        regexValidator(lastNameRegex, value, setLastName);
        break;
      case 'nationality':
        regexValidator(nameRegex, value, setNationality);
        break;
      case 'birth':
        regexValidator(numbersRegex, value, setBirthYear);
        break;
      case 'death':
        regexValidator(numbersRegex, value, setDeathYear);
        break;
      case 'wiki':
        regexValidator(websiteRegex, value, setWiki);
        if (!value.includes('wikipedia')) {
          invalidValue(e);
        } else {
          invalidValue(e, true);
        }
        break;
      case 'goodreads':
        regexValidator(websiteRegex, value, setGoodreads);
        if (!value.includes('goodreads')) {
          invalidValue(e);
        } else {
          invalidValue(e, true);
        }
        break;
      case 'lubimyczytac':
        regexValidator(websiteRegex, value, setLubimyczytac);
        if (!value.includes('lubimyczytac')) {
          invalidValue(e);
        } else {
          invalidValue(e, true);
        }
        break;

      default:
        break;
    }
  };

  const handleSubmit = () => {
    addAuthor({
      variables: {
        firstName,
        lastName,
        nationality,
        birthYear: Number(birthYear),
        deathYear: Number(deathYear),
        bioPages: {
          wiki,
          goodreads,
          lubimyczytac,
        },
      },
    });
  };

  const showForm = () => {
    return (
      <form className='addAuthor__form' autoComplete='off'>
        <div className='addAuthor__form_element'>
          <label htmlFor='firstName'>first name</label>
          <input
            type='text'
            id='firstName'
            required
            value={firstName}
            onChange={e => handleInputs(e)}
          />
        </div>
        <div className='addAuthor__form_element'>
          <label htmlFor='secondName'>second name</label>
          <input
            type='text'
            id='secondName'
            required
            value={secondName}
            onChange={e => handleInputs(e)}
          />
        </div>
        <div className='addAuthor__form_element'>
          <label htmlFor='thirdName'>third name</label>
          <input
            type='text'
            id='thirdName'
            required
            value={thirdName}
            onChange={e => handleInputs(e)}
          />
        </div>
        <div className='addAuthor__form_element'>
          <label htmlFor='lastName'>last name</label>
          <input
            type='text'
            id='lastName'
            required
            value={lastName}
            onChange={e => handleInputs(e)}
          />
        </div>
        <div className='addAuthor__form_element'>
          <label htmlFor='nationality'>nationality</label>
          <input
            type='text'
            id='nationality'
            value={nationality}
            onChange={e => handleInputs(e)}
          />
        </div>
        <div className='addAuthor__form_element'>
          <label htmlFor='birth'>born in</label>
          <input
            type='text'
            id='birth'
            value={birthYear}
            onChange={e => handleInputs(e)}
          />
        </div>
        <div className='addAuthor__form_element'>
          <label htmlFor='death'>died in</label>
          <input
            type='text'
            id='death'
            value={deathYear}
            onChange={e => handleInputs(e)}
          />
        </div>
        <div className='addAuthor__form_element'>
          <label htmlFor='wiki'>Wikipedia</label>
          <input
            name='link'
            type='text'
            id='wiki'
            value={wiki}
            onChange={e => handleInputs(e)}
          />
        </div>
        <div className='addAuthor__form_element'>
          <label htmlFor='goodreads'>goodreads</label>
          <input
            name='link'
            type='text'
            id='goodreads'
            value={goodreads}
            onChange={e => handleInputs(e)}
          />
        </div>
        <div className='addAuthor__form_element'>
          <label htmlFor='lubimyczytac'>lubimyczytac</label>
          <input
            name='link'
            type='text'
            id='lubimyczytac'
            value={lubimyczytac}
            onChange={e => handleInputs(e)}
          />
        </div>
        <Button className='addAuthor__form_button' handleClick={handleSubmit} />
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
    <div className={`${className} addAuthor`}>
      {goBackButton && (
        <Button
          className='addAuthor__button'
          text='go back'
          goBack={goBackButton}
        />
      )}
      {data && successMessage ? (
        <SuccessMessage item='author' successMessage={successMessage} />
      ) : null}
      {loading && <LoadingSpinner />}
      {!loading && !successMessage ? showForm() : null}
      {showErrors()}
    </div>
  );
};

export default AddAuthorForm;
