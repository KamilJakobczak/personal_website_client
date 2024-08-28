import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { ADD_GENRE } from '../../../../../GraphQL/mutations';
import Error from '../../../../Error';
import LoadingSpinner from '../../../../LoadingSpinner';
import Button from '../general-purpose/Button';
import { regexValidator } from '../../utility/handlers/regexValidator';
import { genreRegex } from '../../utility/regex';
import SuccessMessage from '../general-purpose/SuccessMessage';
import { Flags } from '../../utility/enums';

interface AddGenreFormProps {
  className?: string;
  genre?: string;
  onAdded?: React.Dispatch<React.SetStateAction<string[]>>;
}

const AddGenreForm: React.FC<AddGenreFormProps> = ({
  className,
  genre,
  onAdded,
}) => {
  const [name, setName] = useState(genre || '');
  const [successMessage, setSuccessMessage] = useState('');
  const [userError, setUserError] = useState('');

  const [addGenre, { data, loading, error }] = useMutation(ADD_GENRE, {
    onCompleted(data) {
      setName('');
      if (data.addGenre.userErrors[0].message) {
        setUserError(data.addGenre.userErrors[0].message);
        onAdded && onAdded(prevState => [...prevState, ' ']);
      }
      if (data.addGenre.genre) {
        setUserError('');
        setSuccessMessage(data.addGenre.genre.name);
        onAdded && onAdded(prevState => [...prevState, data.addGenre.genre.id]);

        setTimeout(() => {
          setSuccessMessage('');
        }, 3000);
      }
    },
  });

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    regexValidator(genreRegex, value, setName);
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
        <h5>new genre</h5>
        <div className='add_publisher__form_element'>
          <label htmlFor='name'>name</label>
          <input
            type='text'
            id='name'
            autoComplete='off'
            required
            value={name}
            placeholder='small characters only'
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
    <div className={`${className} addGenre`}>
      {data && successMessage ? (
        <SuccessMessage item='genre' successMessage={successMessage} />
      ) : null}
      {loading && <LoadingSpinner />}

      {!loading && !successMessage ? showForm() : null}
      {showErrors()}
    </div>
  );
};

export default AddGenreForm;
