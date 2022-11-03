import { useQueries } from './hooks/useQueries';
import Select from './Select';
import { useState } from 'react';
import { useQuery } from '@apollo/client';
import {
  LOAD_AUTHORS,
  LOAD_GENRES,
  LOAD_TRANSLATORS,
} from '../../../GraphQL/queries';

const AddBook: React.FC = () => {
  const {
    error: errorA,
    loading: loadingA,
    data: dataA,
  } = useQuery(LOAD_AUTHORS);
  const {
    error: errorG,
    loading: loadingG,
    data: dataG,
  } = useQuery(LOAD_GENRES);
  const {
    error: errorT,
    loading: loadingT,
    data: dataT,
  } = useQuery(LOAD_TRANSLATORS);

  const [authorsInputCounter, setAuthorsInputCounter] = useState([0]);
  const [genresInputCounter, setGenresInputCounter] = useState([0]);
  const [translatorsInputCounter, setTranslatorsInputCounter] = useState([0]);
  const [language, setLanguage] = useState('English');
  const [inCollection, setInCollection] = useState(false);

  const handleAddAuthorsInput = (
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
        setGenresInputCounter([...authorsInputCounter, counter]);
        break;
      case 'translators':
        counter = translatorsInputCounter.length;
        setTranslatorsInputCounter([...authorsInputCounter, counter]);
        break;
      default:
        break;
    }
  };
  return (
    <div className='add_book'>
      <form className='add_book add_book__form' action=''>
        <div className='add_book__form_element'>
          <label htmlFor='title'>title:</label>
          <input id='title' type='text' autoComplete='off' required />
        </div>
        <div className='add_book__form_element'>
          <label htmlFor='language'>language:</label>
          <select id='language' name='language'>
            <option value='Polish'>Polish</option>
            <option value='English'>English</option>
          </select>
        </div>
        <div className='add_book__form_element'>
          {dataG &&
            genresInputCounter.map(input => {
              return (
                <Select
                  key={input}
                  onAddClick={handleAddAuthorsInput}
                  data={dataG.genres}
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
          {dataA &&
            authorsInputCounter.map(input => {
              return (
                <Select
                  key={input}
                  onAddClick={handleAddAuthorsInput}
                  data={dataA.authors}
                  item='authors'
                />
              );
            })}
        </div>
        <div className='add_book__form_element'>
          <label htmlFor='publisher'>publisher:</label>
          <input id='publisher' list='' name='' />
          <datalist id=''></datalist>
        </div>
        {language === 'English' && (
          <div className='add_book__form_element'>
            {dataT &&
              translatorsInputCounter.map(input => {
                return (
                  <Select
                    key={input}
                    onAddClick={handleAddAuthorsInput}
                    data={dataT.translators}
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
            {dataC &&
              collectionsInputCounter.map(input => {
                return (
                  <Select
                    key={input}
                    onAddClick={handleAddAuthorsInput}
                    data={dataT.translators}
                    item='translators'
                  />
                );
              })}
          </div>
        )}
      </form>
    </div>
  );
};

export default AddBook;
