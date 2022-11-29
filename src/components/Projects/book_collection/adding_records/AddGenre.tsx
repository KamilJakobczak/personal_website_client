import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { ADD_GENRE } from '../../../../GraphQL/mutations';
import Error from '../../../Error';
import LoadingSpinner from '../../../LoadingSpinner';
import Button from '../Button';
import SuccessMessage from '../SuccessMessage';

const AddGenre: React.FC = () => {
  const [name, setName] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [userError, setUserError] = useState('');

  const [addGenre, { data, loading, error }] = useMutation(ADD_GENRE, {
    onCompleted(data) {
      setName('');
      if (data.addGenre.userErrors[0].message) {
        setUserError(data.addGenre.userErrors[0].message);
      }
      if (data.addGenre.genre) {
        setUserError('');
        setSuccessMessage(data.addGenre.genre.name);

        setTimeout(() => {
          setSuccessMessage('');
        }, 3000);
      }
    },
  });

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const regex = /^([ \u00c0-\u01ffa-z'-])+$/gm;

    const regexCheck = value.match(regex);

    if (!regexCheck) {
      if (value.length === 0) {
        setName('');
      }
    } else {
      setName(value);
    }
  };

  const handleSubmit = () => {
    addGenre({
      variables: {
        name,
      },
    });
  };

  const showForm = () => {
    return (
      <form action='' className='add_genre__form'>
        <div className='add_publisher__form_element'>
          <label htmlFor='name'>name</label>
          <input
            type='text'
            id='name'
            autoComplete='off'
            required
            value={name}
            placeholder='small characters'
            onChange={e => handleNameChange(e)}
          />
        </div>
        <Button className='add_genre__form_button' handleClick={handleSubmit} />
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
    <div className='add_genre new'>
      <Button className='add_genre__button' text='go back' goBack={true} />
      {data && successMessage ? (
        <SuccessMessage item='genre' successMessage={successMessage} />
      ) : null}
      {loading && <LoadingSpinner />}

      {!loading && !successMessage ? showForm() : null}
      {showErrors()}
    </div>
  );
};

export default AddGenre;
