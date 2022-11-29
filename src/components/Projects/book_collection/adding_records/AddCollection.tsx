import { useMutation, useQuery } from '@apollo/client';
import { processSelectionData } from '../handlers/processSelectionData';
import Error from '../../../Error';
import React, { useState } from 'react';
import { ADD_COLLECTION } from '../../../../GraphQL/mutations';
import { LOAD_BOOKS } from '../../../../GraphQL/queries';
import Button from '../Button';
import Select from '../Select';
import { checkDuplicates } from '../handlers/checkDuplicates';
import _ from 'lodash';
import LoadingSpinner from '../../../LoadingSpinner';
import SuccessMessage from '../SuccessMessage';

const AddCollection: React.FC = () => {
  const [name, setName] = useState('');
  const [addBooks, setAddBooks] = useState(false);
  const [books, setBooks] = useState<string[]>(['']);
  const [tomes, setTomes] = useState<string[]>(['']);
  const [booksSelectionCounter, setBooksSelectionCounter] = useState([0]);
  const [duplicationError, setDuplicationError] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [userError, setUserError] = useState('');
  const {
    data: dataB,
    error: errorB,
    loading: loadingB,
  } = useQuery(LOAD_BOOKS);
  const [addCollection, { data, loading, error }] = useMutation(
    ADD_COLLECTION,
    {
      onCompleted(data) {
        onCompletedMutation(data);
      },
    }
  );

  const onCompletedMutation = (data: any) => {
    setName('');
    setBooks(['']);
    setTomes(['']);
    setAddBooks(false);
    if (data.addCollection.userErrors[0].message) {
      setUserError(data.addCollection.userErrors[0].message);
    }
    if (data.addCollection.collection) {
      setSuccessMessage(data.addCollection.collection.name);

      setBooksSelectionCounter([0]);
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    }
  };

  // HANDLERS
  const handleAddSelect = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    if (!checkDuplicates(tomes) && !checkDuplicates(books)) {
      setBooksSelectionCounter([
        ...booksSelectionCounter,
        booksSelectionCounter.length,
      ]);
    }
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target) {
      const { value, id } = e.target;
      const element = e.target;
      if (booksSelectionCounter.length === 1) {
        setBooks([value]);
      } else {
        processSelectionData(
          books,
          setBooks,
          value,
          booksSelectionCounter,
          id,
          element,
          setDuplicationError
        );
      }
    }
  };

  const handleRemoveSelect = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: number
  ) => {
    e.preventDefault();

    const arr = _.without(booksSelectionCounter, id);
    for (let i = 0; i < arr.length; i++) {
      _.fill(arr, i, i, i + 1);
    }

    const editedTomes = _.without(tomes, tomes[id]);
    const editedBooks = _.without(books, books[id]);
    setBooksSelectionCounter(arr);
    setTomes(editedTomes);
    setBooks(editedBooks);
  };

  const handleTomeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const element = e.target;
    const { id, value } = element;

    if (booksSelectionCounter.length === 1) {
      setTomes([value]);
    } else {
      processSelectionData(
        tomes,
        setTomes,
        value,
        booksSelectionCounter,
        id,
        element,
        setDuplicationError
      );
    }
  };

  const handleSubmit = () => {
    const arr: { tome: string; bookId: string }[] = [];
    for (let i = 0; i < tomes.length; i++) {
      arr.push({
        tome: tomes[i],
        bookId: books[i],
      });
    }

    addCollection({
      variables: {
        name: name,
        booksInCollection: arr,
      },
    });
  };

  // RENDER ELEMENTS

  const showForm = () => {
    return (
      <form action='' className='add_collection__form'>
        <div className='add_collection__form_element'>
          <label htmlFor='name'>name</label>
          <input
            type='text'
            id='name'
            autoComplete='off'
            required
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>
        <div className='add_collection__form_element'>
          <label htmlFor='books'>
            do you want to add existing books to the collection?
          </label>
          <label>
            <input
              type='radio'
              name='books'
              id='yes'
              onClick={() => setAddBooks(true)}
            />
            yes
          </label>
          <label>
            <input
              type='radio'
              name='books'
              id='no'
              onClick={() => setAddBooks(false)}
            />
            no
          </label>
        </div>
        {!loading && addBooks && showAddBooks()}
        {showErrors()}
        {duplicationError && (
          <Error text='Duplication error(s) detected, correct mistakes before continuing' />
        )}
        <Button
          className='add_collection__form_button'
          handleClick={handleSubmit}
        />
      </form>
    );
  };

  const showAddBooks = () => {
    return (
      <div className='add_collection__form_element'>
        <label htmlFor='bookList'>
          {booksSelectionCounter.map(selection => {
            return (
              <React.Fragment key={selection}>
                <label htmlFor='tome'>tome</label>
                <input
                  autoComplete='off'
                  type='text'
                  name='tome'
                  id={`${selection}`}
                  value={tomes[selection] || ''}
                  onChange={e => handleTomeInput(e)}
                />
                <Select
                  id={selection}
                  data={dataB.books}
                  item='books'
                  onAddClick={handleAddSelect}
                  handleSelectChange={handleSelectChange}
                  onRemoveClick={handleRemoveSelect}
                />
              </React.Fragment>
            );
          })}
        </label>
      </div>
    );
  };

  const showErrors = () => {
    if (error) {
      return <Error text={error.message} />;
    } else if (errorB) {
      return <Error text={errorB.message} />;
    } else if (userError) {
      return <Error text={userError} />;
    }
  };

  return (
    <div className='add_collection'>
      <Button className='add_collection__button' text='go back' goBack={true} />
      {data && successMessage ? (
        <SuccessMessage item='collection' successMessage={successMessage} />
      ) : null}
      {(loading || loadingB) && <LoadingSpinner />}
      {!loading && !loadingB && !successMessage ? showForm() : null}
    </div>
  );
};

export default AddCollection;
