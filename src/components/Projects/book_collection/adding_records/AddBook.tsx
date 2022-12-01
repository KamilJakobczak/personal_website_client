import { useQueries } from '../hooks/useQueries';
import Select from '../Select';
import { useState } from 'react';

import LoadingSpinner from '../../../LoadingSpinner';
import Error from '../../../Error';
import { processSelectionData } from '../handlers/processSelectionData';
import axios from 'axios';
import { graphqlApi } from '../../../../server';

const AddBook: React.FC = () => {
  // FETCHING DATA
  const { data, errors, loading } = useQueries();

  // CONTROL STATES
  const [authorsInputCounter, setAuthorsInputCounter] = useState([0]);
  const [genresInputCounter, setGenresInputCounter] = useState([0]);
  const [translatorsInputCounter, setTranslatorsInputCounter] = useState([0]);
  const [collectionsInputCounter, setCollectionsInputCounter] = useState([0]);
  const [inCollection, setInCollection] = useState(false);

  // FORM VALUES

  const [title, setTitle] = useState('');
  const [language, setLanguage] = useState('Polish');
  const [genres, setGenres] = useState<string[]>([]);
  const [publisher, setPublisher] = useState('');
  const [translators, setTranslators] = useState<string[]>([]);
  const [authors, setAuthors] = useState<string[]>([]);
  const [collections, setCollections] = useState<string[]>([]);
  const [isbn, setIsbn] = useState('');
  const [pages, setPages] = useState('');
  const [firstEdition, setFirstEdition] = useState('');

  // HANDLE EVENTS

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target) {
      const { name, value, id } = e.target;
      const element = e.target;
      switch (name) {
        case 'authors':
          processSelectionData(
            authors,
            setAuthors,

            value,
            authorsInputCounter,
            id,
            element
          );
          break;
        case 'collections':
          processSelectionData(
            collections,
            setCollections,

            value,
            collectionsInputCounter,
            id,
            element
          );
          break;
        case 'genres':
          processSelectionData(
            genres,
            setGenres,

            value,
            genresInputCounter,
            id,
            element
          );
          break;
        case 'publishers':
          setPublisher(value);
          break;
        case 'translators':
          processSelectionData(
            translators,
            setTranslators,

            value,
            translatorsInputCounter,
            id,
            element
          );
          break;

        default:
          break;
      }
    }
  };

  const handleRemoveSelect = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: number
  ) => {
    e.preventDefault();
  };

  const handleNumerics = (e: React.ChangeEvent<HTMLSelectElement>) => {};

  const handleBookSubmit = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    console.log(
      title,
      authors,
      language,
      pages,
      isbn,
      firstEdition,
      genres,
      publisher,
      translators,
      collections
    );
    const data = {
      title,
      authors,
      language,
      pages,
      isbn,
      firstEdition,
      genres,
      publisher,
      translators,
      collections,
    };
    axios.post(`${graphqlApi}/add/book`, data);
  };

  // RENDER ELEMENTS
  const showForm = () => {
    return (
      <form className='add_book add_book__form' action=''>
        <div className='add_book__form_element__title'>
          <label htmlFor='title'>title:</label>
          <input
            value={title}
            id='title'
            type='text'
            autoComplete='off'
            required
            onChange={e => setTitle(e.target.value)}
          />
        </div>
        <div className='add_book__form_element__language'>
          <label htmlFor='language'>language:</label>
          <select
            id='language'
            name='language'
            onChange={e => setLanguage(e.target.value)}
          >
            <option value='Polish'>Polish</option>
            <option value='English'>English</option>
          </select>
        </div>
        <div className='add_book__form_element__genres'>
          {genresInputCounter.map(input => {
            return (
              <Select
                item='genre'
                id={input}
                key={input}
                data={data.genres}
                inputValues1={genres}
                inputCounter={genresInputCounter}
                handleSelectChange={handleSelectChange}
                setInputCounter={setGenresInputCounter}
                setInputValues1={setGenres}
              />
            );
          })}
        </div>
        <div className='add_book__form_element__pages'>
          <label htmlFor='pages'>pages:</label>
          <input
            autoComplete='off'
            id='pages'
            type='text'
            value={pages}
            min={0}
            max={2000}
            step={1}
            onChange={e => setPages(e.target.value)}
          />
        </div>
        <div className='add_book__form_element__authors'>
          {authorsInputCounter.map(input => {
            return (
              <Select
                item='author'
                id={input}
                key={input}
                data={data.authors}
                inputValues1={authors}
                inputCounter={authorsInputCounter}
                handleSelectChange={handleSelectChange}
                setInputCounter={setAuthorsInputCounter}
                setInputValues1={setAuthors}
              />
            );
          })}
        </div>
        <div className='add_book__form_element__publisher'>
          <label htmlFor='publisher'>publisher:</label>

          <select
            className='form_select'
            id='publishers'
            name='publishers'
            onChange={e => handleSelectChange(e)}
          >
            <option value=''>-- find me --</option>
            {data.publishers.map((publisher: { id: string; name: string }) => {
              return (
                <option
                  key={publisher.id}
                  value={publisher.id}
                  label={publisher.name}
                ></option>
              );
            })}
          </select>
        </div>
        {language === 'English' && (
          <div className='add_book__form_element__translators'>
            {translatorsInputCounter.map(input => {
              return (
                <Select
                  item='translator'
                  id={input}
                  key={input}
                  data={data.translators}
                  inputValues1={translators}
                  inputCounter={translatorsInputCounter}
                  handleSelectChange={handleSelectChange}
                  setInputCounter={setTranslatorsInputCounter}
                  setInputValues1={setTranslators}
                />
              );
            })}
          </div>
        )}
        <div className='add_book__form_element__isbn'>
          <label htmlFor='isbn'>isbn</label>
          <input
            pattern='((?:[\dX]{13})|(?:[\d\-X]{17})|(?:[\dX]{10})|(?:[\d\-X]{13}))'
            autoComplete='off'
            id='isbn'
            type='text'
            value={isbn}
            onChange={e => setIsbn(e.target.value)}
          />
        </div>
        <div className='add_book__form_element__firstEdition'>
          <label htmlFor='firstEdition'>first edition(global):</label>
          <input
            autoComplete='off'
            type='text'
            id='firstEdition'
            value={firstEdition}
            min={0}
            max={2030}
            step={1}
            onChange={e => setFirstEdition(e.target.value)}
          />
        </div>
        <div className='add_book__form_element__cover'>
          <label htmlFor='cover'>upload cover</label>
          <input id='cover' type='file' />
        </div>
        <div className='add_book__form_element__isCollection'>
          <label htmlFor='in_collection'>Part of a collection?</label>
          <input
            type='radio'
            name='in_collection'
            id='yes'
            onClick={() => setInCollection(true)}
          />
          <label htmlFor='yes'>Yes</label>
          <input
            type='radio'
            name='in_collection'
            id='no'
            onClick={() => setInCollection(false)}
          />
          <label htmlFor='no'>No</label>
        </div>
        {inCollection && (
          <div className='add_book__form_element__collections'>
            {collectionsInputCounter.map(input => {
              return (
                <Select
                  item='collection'
                  id={input}
                  key={input}
                  data={data.collections}
                  inputValues1={collections}
                  inputCounter={collectionsInputCounter}
                  handleSelectChange={handleSelectChange}
                  setInputCounter={setCollectionsInputCounter}
                  setInputValues1={setCollections}
                />
              );
            })}
          </div>
        )}
        <button onClick={e => handleBookSubmit(e)}>submit</button>
      </form>
    );
  };

  return (
    <div className='add_book new'>
      <div className='upload'>Upload component</div>
      {loading && <LoadingSpinner />}
      {errors && <Error text={errors} />}
      {data && !loading && showForm()}
    </div>
  );
};

export default AddBook;
