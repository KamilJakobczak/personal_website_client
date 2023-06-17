import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { ADD_TRANSLATOR } from '../../../../../GraphQL/mutations';
import Error from '../../../../Error';
import LoadingSpinner from '../../../../LoadingSpinner';
import Button from '../general-purpose/Button';
import { regexValidator } from '../../utility/handlers/regexValidator';
import { lastNameRegex, nameRegex } from '../../utility/regex';
import SuccessMessage from '../general-purpose/SuccessMessage';

interface AddTranslatorProps {
  goBackButton: boolean;
  className: string;
}

const AddTranslator: React.FC<AddTranslatorProps> = ({
  goBackButton,
  className,
}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userError, setUserError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const [addTranslator, { data, loading, error }] = useMutation(
    ADD_TRANSLATOR,
    {
      onCompleted(data) {
        if (data.addTranslator.userErrors[0].message) {
          setUserError(data.addTranslator.userErrors[0].message);
        }
        if (data.addTranslator.translator) {
          setFirstName('');
          setLastName('');
          setUserError('');
          setSuccessMessage(
            data.addTranslator.translator.firstName +
              ' ' +
              data.addTranslator.translator.lastName
          );

          setTimeout(() => {
            setSuccessMessage('');
          }, 3000);
        }
      },
    }
  );

  const handleNamesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, id } = e.target;

    switch (id) {
      case 'firstName':
        regexValidator(nameRegex, value, setFirstName);
        break;
      case 'lastName':
        regexValidator(lastNameRegex, value, setLastName);
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
          <label htmlFor='firstName'>first name:</label>
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
          <label htmlFor='lastName'>last name:</label>
          <input
            type='text'
            id='lastName'
            autoComplete='off'
            required
            value={lastName}
            onChange={e => handleNamesChange(e)}
          />
        </div>
        <Button
          className='addTranslator__form_button'
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
    <div className={`${className} addTranslator`}>
      <Button
        className='addTranslator__button'
        text='go back'
        goBack={goBackButton}
      />
      {data && successMessage ? (
        <SuccessMessage item='translator' successMessage={successMessage} />
      ) : null}
      {loading && <LoadingSpinner />}
      {!loading && !successMessage ? showForm() : null}
      {showErrors()}
    </div>
  );
};

export default AddTranslator;
