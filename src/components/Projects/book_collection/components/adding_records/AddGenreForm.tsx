import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { ADD_GENRE, UPDATE_GENRE } from '../../../../../GraphQL/mutations';
import CustomError from '../../../../CustomError';
import LoadingSpinner from '../../../../LoadingSpinner';
import Button from '../general-purpose/Button';
import { regexValidator } from '../../utility/handlers/regexValidator';
import { genreRegex } from '../../utility/regex';
import SuccessMessage from '../general-purpose/SuccessMessage';
import { useLocation, useNavigate } from 'react-router-dom';
import { Flags } from '../../utility/enums';

interface AddGenreFormProps {
  className?: string;
  genre?: string;
  onAdded?: React.Dispatch<React.SetStateAction<string[]>>;
  flag: Flags;
}

const AddGenreForm: React.FC<AddGenreFormProps> = ({ className, genre, onAdded, flag }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const editableData = location.state;

  const [name, setName] = useState(genre || editableData?.name || '');
  const [namePolish, setNamePolish] = useState(editableData?.namePolish || '');
  const [successMessage, setSuccessMessage] = useState('');
  const [userError, setUserError] = useState('');

  const [addGenre, { data, loading, error }] = useMutation(ADD_GENRE, {
    onCompleted(data) {
      if (data.addGenre.userErrors[0].message) {
        setUserError(data.addGenre.userErrors[0].message);
        onAdded && onAdded(prevState => [...prevState, ' ']);
      }
      if (data.addGenre.genre) {
        setName('');
        setNamePolish('');
        setUserError('');
        setSuccessMessage(data.addGenre.genre.name);
        onAdded && onAdded(prevState => [...prevState, data.addGenre.genre.id]);
        setTimeout(() => {
          setSuccessMessage('');
          navigate(location.pathname.slice(0, 20));
        }, 3000);
      }
    },
  });

  const [updateGenre, { data: dataU, loading: loadingU, error: errorU }] = useMutation(UPDATE_GENRE, {
    onCompleted(data) {
      const linkRedirect = location.pathname.slice(0, 34);
      navigate(linkRedirect, {
        state: { id: editableData.id, refetch: true },
      });
    },
  });

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    switch (id) {
      case 'name':
        regexValidator(genreRegex, value, setName);
        break;
      case 'namePolish':
        regexValidator(genreRegex, value, setNamePolish);
    }
  };

  const handleSubmit = () => {
    const variables = {
      name,
      namePolish,
    };
    if (flag === Flags.Add) addGenre({ variables });
    if (flag === Flags.Edit)
      updateGenre({
        variables: { ...variables, ...{ id: editableData.id } },
      });
  };

  const showForm = () => {
    return (
      <form action='' className='add_genre__form'>
        <h5>{flag} genre</h5>
        <div className='add_genre__form_element'>
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
        <div className='add_genre__form_element'>
          <label htmlFor='namePolish'>Polish Name</label>
          <input
            type='text'
            id='namePolish'
            autoComplete='off'
            required
            value={namePolish}
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
      return <CustomError text={error.message} />;
    } else if (userError) {
      return <CustomError text={userError} />;
    }
  };

  return (
    <div className={`${className} addGenre`}>
      {data && successMessage ? <SuccessMessage item='genre' successMessage={successMessage} /> : null}
      {loading && <LoadingSpinner />}

      {!loading && !successMessage ? showForm() : null}
      {showErrors()}
    </div>
  );
};

export default AddGenreForm;
