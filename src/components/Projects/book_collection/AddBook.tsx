import { useQueries } from './hooks/useQueries';
import Select from './Select';
import { useState } from 'react';

import LoadingSpinner from '../../LoadingSpinner';
import Error from '../../Error';

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

  // HANDLE EVENTS
  const handleAddInputs = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    item: string
  ) => {
    e.preventDefault();
    let counter;
    switch (item) {
      case 'authors':
        counter = authorsInputCounter.length;
        setAuthorsInputCounter([...authorsInputCounter, counter]);
        break;
      case 'genres':
        counter = genresInputCounter.length;
        setGenresInputCounter([...genresInputCounter, counter]);
        break;
      case 'translators':
        counter = translatorsInputCounter.length;
        setTranslatorsInputCounter([...translatorsInputCounter, counter]);
        break;
      case 'collections':
        counter = collectionsInputCounter.length;
        setCollectionsInputCounter([...collectionsInputCounter, counter]);
        break;
      default:
        break;
    }
  };

  const handleBookSubmit = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    console.log(title, language, genres, publisher);
  };

  const setter = (data, method, value, counter, id) => {
    const idNumber = Number(id);
    const index = data.indexOf(value);
    if (counter.length === 1) {
      method([value]);
    } else if (index === -1 && index !== idNumber) {
      const arr = data;
      data[idNumber] = value;
      method(arr);
    }
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target) {
      const { name, value, id } = e.target;
      const idNumber = Number(id);

      switch (name) {
        case 'authors':
          const authorIndex = genres.indexOf(value);
          if (genresInputCounter.length === 1) {
            setAuthors([value]);
          } else if (authorIndex === -1 && authorIndex !== idNumber) {
            const authorsArr = authors;
            authorsArr[idNumber] = value;
            setAuthors(authorsArr);
          } else {
            e.target.classList.add('invalid');
          }
          break;
        case 'collections':
          const collectionIndex = collections.indexOf(value);
          if (collectionsInputCounter.length === 1) {
            setCollections([value]);
          } else if (collectionIndex === -1 && collectionIndex !== idNumber) {
            const collectionsArr = collections;
            collectionsArr[idNumber] = value;
            setCollections(collectionsArr);
          } else {
            e.target.classList.add('invalid');
          }
          break;
        case 'genres':
          const genreIndex = genres.indexOf(value);
          if (genresInputCounter.length === 1) {
            setGenres([value]);
          } else if (genreIndex === -1 && genreIndex !== idNumber) {
            const genreArr = genres;
            genreArr[idNumber] = value;
            setGenres(genreArr);
          } else {
            e.target.classList.add('invalid');
          }

          break;
        case 'publishers':
          setPublisher(value);
          break;
        case 'translators':
          const translatorIndex = translators.indexOf(value);
          if (translatorsInputCounter.length === 1) {
            setTranslators([value]);
          } else if (translatorIndex === -1 && translatorIndex !== idNumber) {
            const translatorsArr = translators;
            translatorsArr[idNumber] = value;
            setTranslators(translatorsArr);
          } else {
            e.target.classList.add('invalid');
          }
          break;

        default:
          break;
      }
    }
  };

  // RENDER ELEMENTS
  const showElements = () => {
    return (
      <form className='add_book add_book__form' action=''>
        <div className='add_book__form_element'>
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
        <div className='add_book__form_element'>
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
        <div className='add_book__form_element'>
          {genresInputCounter.map(input => {
            return (
              <Select
                id={input}
                handleSelectChange={handleSelectChange}
                key={input}
                onAddClick={handleAddInputs}
                data={data.genres}
                item='genres'
              />
            );
          })}
        </div>
        <div className='add_book__form_element'>
          <label htmlFor='pages'>pages:</label>
          <input type='number' id='pages' />
        </div>
        <div className='add_book__form_element'>
          {authorsInputCounter.map(input => {
            return (
              <Select
                id={input}
                handleSelectChange={handleSelectChange}
                key={input}
                onAddClick={handleAddInputs}
                data={data.authors}
                item='authors'
              />
            );
          })}
        </div>
        <div className='add_book__form_element'>
          <label htmlFor='publisher'>publisher:</label>

          <select
            className='form_select'
            id='publishers'
            name='publishers'
            onChange={e => handleSelectChange(e)}
          >
            <option value=''>-- find me --</option>
            {data.publishers.map((publisher: any) => {
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
          <div className='add_book__form_element'>
            {translatorsInputCounter.map(input => {
              return (
                <Select
                  id={input}
                  handleSelectChange={handleSelectChange}
                  key={input}
                  onAddClick={handleAddInputs}
                  data={data.translators}
                  item='translators'
                />
              );
            })}
          </div>
        )}
        <div className='add_book__form_element'>
          <label htmlFor='isbn'>isbn</label>
          <input id='isbn' type='text' />
        </div>
        <div className='add_book__form_element'>
          <label htmlFor='firstEdition'>first edition(global):</label>
          <input type='text' id='firstEdition' />
        </div>
        <div className='add_book__form_element'>
          <label htmlFor='cover'>upload cover</label>
          <input id='cover' type='file' />
        </div>
        <div className='add_book__form_element'>
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
          <div className='add_book__form_element'>
            {collectionsInputCounter.map(input => {
              return (
                <Select
                  id={input}
                  handleSelectChange={handleSelectChange}
                  key={input}
                  onAddClick={handleAddInputs}
                  data={data.collections}
                  item='collections'
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
    <div className='add_book'>
      {loading && <LoadingSpinner />}
      {errors && <Error text={errors} />}
      {data && !loading && showElements()}
    </div>
  );
};

export default AddBook;
