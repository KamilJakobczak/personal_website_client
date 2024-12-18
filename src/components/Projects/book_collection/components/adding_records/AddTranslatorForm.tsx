import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { ADD_TRANSLATOR } from '../../../../../GraphQL/mutations';
import CustomError from '../../../../CustomError';
import LoadingSpinner from '../../../../LoadingSpinner';
import Button from '../general-purpose/Button';
import { regexValidator } from '../../utility/handlers/regexValidator';
import { lastNameRegex, nameRegex } from '../../utility/regex';
import SuccessMessage from '../general-purpose/SuccessMessage';
import { useLocation, useNavigate } from 'react-router-dom';
import { Flags } from '../../utility/enums';

interface AddTranslatorProps {
  className: string;
  flag: Flags;
}

const AddTranslator: React.FC<AddTranslatorProps> = ({ className }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userError, setUserError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const [addTranslator, { data, loading, error }] = useMutation(ADD_TRANSLATOR, {
    onCompleted(data) {
      if (data.addTranslator.userErrors[0].message) {
        setUserError(data.addTranslator.userErrors[0].message);
      }
      if (data.addTranslator.translator) {
        setFirstName('');
        setLastName('');
        setUserError('');
        setSuccessMessage(data.addTranslator.translator.firstName + ' ' + data.addTranslator.translator.lastName);

        setTimeout(() => {
          setSuccessMessage('');
          navigate(location.pathname.slice(0, 20));
        }, 3000);
      }
    },
  });

  const handleNamesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, id } = e.target;

    switch (id) {
      case 'firstName':
        if (typeof value === 'string') setFirstName(value);
        break;
      case 'lastName':
        if (typeof value === 'string') setLastName(value);

        break;
      default:
        break;
    }
  };

  const handleSubmit = () => {
    addTranslator({
      variables: {
        firstName,
        lastName,
      },
    });
  };

  const showForm = () => {
    return (
      <form action='addTranslator__form'>
        <h5>new translator</h5>
        <div className='addTranslator__form_element'>
          <label htmlFor='firstName'>first name</label>
          <input
            type='text'
            id='firstName'
            autoComplete='off'
            required
            value={firstName}
            onChange={e => handleNamesChange(e)}
          />
        </div>
        <div className='addTranslator__form_element'>
          <label htmlFor='lastName'>last name</label>
          <input
            type='text'
            id='lastName'
            autoComplete='off'
            required
            value={lastName}
            onChange={e => handleNamesChange(e)}
          />
        </div>
        <Button className='addTranslator__form_button' handleClick={handleSubmit} />
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
    <div className={`${className} addTranslator`}>
      {data && successMessage ? <SuccessMessage item='translator' successMessage={successMessage} /> : null}
      {loading && <LoadingSpinner />}
      {!loading && !successMessage ? showForm() : null}
      {showErrors()}
    </div>
  );
};

export default AddTranslator;
