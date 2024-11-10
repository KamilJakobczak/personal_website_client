import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { ADD_AUTHOR, UPDATE_AUTHOR } from '../../../../../GraphQL/mutations';
import CustomError from '../../../../CustomError';
import LoadingSpinner from '../../../../LoadingSpinner';
import Button from '../general-purpose/Button';
import { invalidValue, regexValidator } from '../../utility/handlers';
import { lastNameRegex, nameRegex, numbersRegex, websiteRegex } from '../../utility/regex';
import SuccessMessage from '../general-purpose/SuccessMessage';
import { useLocation, useNavigate } from 'react-router-dom';
import { Flags } from '../../utility/enums';

interface AddAuthorFormProps {
  className: string;
  author?: {
    firstName: string;
    secondName: string;
    thirdName: string;
    lastName: string;
  };
  flag: Flags;
  onAdded?: React.Dispatch<React.SetStateAction<string[]>>;
}

const AddAuthorForm: React.FC<AddAuthorFormProps> = ({ className, author, flag, onAdded }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const editableData = location.state;

  const [firstName, setFirstName] = useState(author?.firstName || editableData?.firstName || '');
  const [lastName, setLastName] = useState(author?.lastName || editableData?.lastName || '');
  const [secondName, setSecondName] = useState(author?.secondName || editableData?.secondName || '');
  const [thirdName, setThirdName] = useState(author?.thirdName || editableData?.thirdName || '');
  const [nationality, setNationality] = useState(editableData?.nationality || '');
  const [birthYear, setBirthYear] = useState(editableData?.birthYear || '');
  const [deathYear, setDeathYear] = useState(editableData?.deathYear || '');
  const [wiki, setWiki] = useState(editableData?.wiki || '');
  const [goodreads, setGoodreads] = useState(editableData?.goodreads || '');
  const [lubimyczytac, setLubimyczytac] = useState(editableData?.lubimyczytac || '');

  const [userError, setUserError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const [addAuthor, { data, loading, error }] = useMutation(ADD_AUTHOR, {
    onCompleted(data) {
      afterCompletion(data);
    },
  });
  const [updateAuthor, { data: dataU, loading: loadingU, error: errorU }] = useMutation(UPDATE_AUTHOR, {
    onCompleted(data) {
      setSuccessMessage('Author data updated successfully');

      const linkRedirect = location.pathname.slice(0, 35);
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
      navigate(linkRedirect, {
        state: { id: editableData.id, refetch: true },
      });
    },
  });

  const afterCompletion = (data: any) => {
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
      setSuccessMessage(data.addAuthor.author.firstName + ' ' + data.addAuthor.author.lastName);
      onAdded && onAdded(prevState => [...prevState, data.addAuthor.author.id]);

      setTimeout(() => {
        setSuccessMessage('');
        navigate(location.pathname.slice(0, 20));
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
    const variables = {
      firstName,
      secondName,
      thirdName,
      lastName,
      nationality,
      birthYear: Number(birthYear),
      deathYear: Number(deathYear),
      bioPages: {
        wiki,
        goodreads,
        lubimyczytac,
      },
    };
    if (flag === Flags.Add) {
      addAuthor({
        variables,
      });
    }

    if (flag === Flags.Edit) {
      updateAuthor({
        variables: { ...variables, ...{ id: editableData.id } },
      });
    }
  };

  const showForm = () => {
    return (
      <form className='addAuthor__form' autoComplete='off'>
        <h5>{`${flag} author`}</h5>
        <div className='addAuthor__form_element'>
          <label htmlFor='firstName'>first name</label>
          <input type='text' id='firstName' required value={firstName} onChange={e => handleInputs(e)} />
        </div>
        <div className='addAuthor__form_element'>
          <label htmlFor='secondName'>second name</label>
          <input type='text' id='secondName' required value={secondName} onChange={e => handleInputs(e)} />
        </div>
        <div className='addAuthor__form_element'>
          <label htmlFor='thirdName'>third name</label>
          <input type='text' id='thirdName' required value={thirdName} onChange={e => handleInputs(e)} />
        </div>
        <div className='addAuthor__form_element'>
          <label htmlFor='lastName'>last name</label>
          <input type='text' id='lastName' required value={lastName} onChange={e => handleInputs(e)} />
        </div>
        <div className='addAuthor__form_element'>
          <label htmlFor='nationality'>nationality</label>
          <input type='text' id='nationality' value={nationality} onChange={e => handleInputs(e)} />
        </div>
        <div className='addAuthor__form_element'>
          <label htmlFor='birth'>born in</label>
          <input type='text' id='birth' value={birthYear} onChange={e => handleInputs(e)} />
        </div>
        <div className='addAuthor__form_element'>
          <label htmlFor='death'>died in</label>
          <input type='text' id='death' value={deathYear} onChange={e => handleInputs(e)} />
        </div>
        <div className='addAuthor__form_element'>
          <label htmlFor='wiki'>Wikipedia</label>
          <input name='link' type='text' id='wiki' value={wiki} onChange={e => handleInputs(e)} />
        </div>
        <div className='addAuthor__form_element'>
          <label htmlFor='goodreads'>goodreads</label>
          <input name='link' type='text' id='goodreads' value={goodreads} onChange={e => handleInputs(e)} />
        </div>
        <div className='addAuthor__form_element'>
          <label htmlFor='lubimyczytac'>lubimyczytac</label>
          <input name='link' type='text' id='lubimyczytac' value={lubimyczytac} onChange={e => handleInputs(e)} />
        </div>
        <Button className='addAuthor__form_button' handleClick={handleSubmit} />
      </form>
    );
  };

  const showErrors = () => {
    if (error) {
      return <CustomError text={error.message} />;
    } else if (userError) {
      return <CustomError text={userError} />;
    }
  };

  return (
    <div className={`${className} addAuthor`}>
      {successMessage ? <SuccessMessage item='author' successMessage={successMessage} /> : null}
      {loading && <LoadingSpinner />}
      {!loading && !successMessage ? showForm() : null}
      {showErrors()}
    </div>
  );
};

export default AddAuthorForm;
