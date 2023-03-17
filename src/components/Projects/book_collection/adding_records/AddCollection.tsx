import { useMutation, useQuery } from '@apollo/client';
import { processSelectionData } from '../handlers';
import Error from '../../../Error';
import React, { useState } from 'react';
import { ADD_COLLECTION } from '../../../../GraphQL/mutations';
import { LOAD_BOOKS } from '../../../../GraphQL/queries';
import Button from '../Button';
import Select from '../Select';

import LoadingSpinner from '../../../LoadingSpinner';
import SuccessMessage from '../SuccessMessage';
import { numbersRegex } from '../regex';

interface AddCollectionProps {
  className: string;
  goBackButton: boolean;
}

const AddCollection: React.FC<AddCollectionProps> = ({
  className,
  goBackButton,
}) => {
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

  const handleTomeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (value.match(numbersRegex)) {
      processSelectionData(
        e,
        tomes,
        setTomes,
        booksSelectionCounter,
        setDuplicationError
      );
    } else if (value.length === 0) {
      setTomes(['']);
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
    console.log(
      `Counter: ${booksSelectionCounter}; Tomes: ${tomes}; Books: ${books}; `
    );
    // addCollection({
    //   variables: {
    //     name: name,
    //     booksInCollection: arr,
    //   },
    // });
  };

  // RENDER ELEMENTS

  const showForm = () => {
    return (
      <form action='' className='addCollection__form'>
        <div className='addCollection__form_element'>
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
        <div className='addCollection__form_element addBooksInput'>
          <label className='addBooksInput_label' htmlFor='books'>
            add books to the collection?
          </label>
          <label className='form-control-radio'>
            <input
              type='radio'
              name='books'
              id='yes'
              onClick={() => setAddBooks(true)}
            />
            yes
          </label>
          <label className='form-control-radio'>
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
          className='addCollection__form_button'
          handleClick={handleSubmit}
        />
      </form>
    );
  };

  const showAddBooks = () => {
    return (
      <div className='addCollection__form_element collectionBookList'>
        {booksSelectionCounter.map(selection => {
          return (
            <React.Fragment key={selection}>
              <div>
                <label htmlFor='tome'>tome</label>
                <input
                  autoComplete='off'
                  type='text'
                  name='tome'
                  id={`${selection}`}
                  value={tomes[selection] || ''}
                  onChange={e => handleTomeInput(e)}
                />
              </div>

              <Select
                item='book'
                id={selection}
                data={dataB.books}
                selectedValues={books}
                inputValues={tomes}
                selectCounter={booksSelectionCounter}
                setSelectCounter={setBooksSelectionCounter}
                setSelectedValues={setBooks}
                setInputValues={setTomes}
                setDuplicationError={setDuplicationError}
              />
            </React.Fragment>
          );
        })}
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
    <div className={`${className} addCollection`}>
      <Button
        className='addCollection__button'
        text='go back'
        goBack={goBackButton}
      />
      {data && successMessage ? (
        <SuccessMessage item='collection' successMessage={successMessage} />
      ) : null}
      {(loading || loadingB) && <LoadingSpinner />}
      {!loading && !loadingB && !successMessage ? showForm() : null}
    </div>
  );
};

export default AddCollection;
