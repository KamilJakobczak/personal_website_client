import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { ADD_TRANSLATOR } from '../../../../GraphQL/mutations';
import Error from '../../../Error';
import LoadingSpinner from '../../../LoadingSpinner';
import Button from '../Button';
import SuccessMessage from '../SuccessMessage';

const AddTranslator: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userError, setUserError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const [addTranslator, { data, loading, error }] = useMutation(
    ADD_TRANSLATOR,
    {
      onCompleted(data) {
        setFirstName('');
        setLastName('');
        if (data.addTranslator.userErrors[0].message) {
          setUserError(data.addTranslator.userErrors[0].message);
        }
        if (data.addTranslator.translator) {
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

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const regex = /^([ \u00c0-\u01ffa-zA-Z'-])+$/gm;

    const regexCheck = value.match(regex);

    if (!regexCheck) {
      if (value.length === 0) {
        setFirstName('');
      }
    } else {
      setFirstName(value);
    }
  };

  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const regex = /^([ \u00c0-\u01ffa-zA-Z'-])+$/gm;

    const regexCheck = value.match(regex);

    if (!regexCheck) {
      if (value.length === 0) {
        setLastName('');
      }
    } else {
      setLastName(value);
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
      <form action='add_translator__form'>
        <div className='add_translator__form_element'>
          <label htmlFor='firstName'>first name:</label>
          <input
            type='text'
            id='firstName'
            autoComplete='off'
            required
            value={firstName}
            onChange={e => handleFirstNameChange(e)}
          />
        </div>
        <div className='add_translator__form_element'>
          <label htmlFor='lastName'>last name:</label>
          <input
            type='text'
            id='lastName'
            autoComplete='off'
            required
            value={lastName}
            onChange={e => handleLastNameChange(e)}
          />
        </div>
        <Button
          className='add_translator__form_button'
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
    <div className='add_translator new'>
      <Button className='add_translator__button' text='go back' goBack={true} />
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
