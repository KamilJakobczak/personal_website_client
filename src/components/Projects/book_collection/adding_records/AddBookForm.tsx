import { useQueries } from '../hooks/useQueries';
import Select from '../Select';
import { useState, useEffect } from 'react';
import LoadingSpinner from '../../../LoadingSpinner';
import Error from '../../../Error';
import { regexValidator } from '../handlers';
import { numbersRegex } from '../regex';
import { checkIsbn } from '../handlers/checkIsbn';
import { useMutation } from '@apollo/client';
import { ADD_BOOK } from '../../../../GraphQL/mutations';
import SuccessMessage from '../SuccessMessage';
import Button from '../Button';

interface AddBookFormProps {
  uploadedData?: {
    authors: { existing: string[] | null; new: string[][] | null } | null;
    genres: { existing: string[] | null; new: string[] | null } | null;
    publisher: {
      existing: {
        id: string;
        name: string;
      } | null;
      new: string | null;
    } | null;
    title?: string;
    language?: string;
    cover?: string;
    description?: string;
  };
}

enum Language {
  Polish = 'Polish',
  English = 'English',
}
const AddBookForm: React.FC<AddBookFormProps> = ({ uploadedData }) => {
  // FETCHING DATA
  // console.log(uploadedData);
  const { data, errors, loading } = useQueries();
  const uploadedAuthors = uploadedData?.authors;
  const uploadedGenres = uploadedData?.genres;
  const uploadedDescription = uploadedData?.description;
  const uploadedPublisher = uploadedData?.publisher;
  const uploadedTitle = uploadedData?.title;
  const uploadedLanguage = uploadedData?.language;
  const uploadedCover = uploadedData?.cover;

  // CONTROL STATES
  const [authorsSelectCounter, setAuthorsSelectCounter] = useState([0]);
  const [genresSelectCounter, setGenresSelectCounter] = useState([0]);
  const [translatorsSelectCounter, setTranslatorsSelectCounter] = useState([0]);
  const [collectionsSelectCounter, setCollectionsSelectCounter] = useState([0]);
  const [inCollection, setInCollection] = useState(false);
  const [duplicationError, setDuplicationError] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [userError, setUserError] = useState('');

  // FORM VALUES

  const [title, setTitle] = useState(uploadedTitle || '');
  const [language, setLanguage] = useState(uploadedLanguage || 'POLISH');
  const [genres, setGenres] = useState<string[]>([]);
  const [publisher, setPublisher] = useState(
    uploadedPublisher ? uploadedPublisher.existing : ''
  );
  const [translators, setTranslators] = useState<string[]>([]);
  const [authors, setAuthors] = useState<string[]>([]);
  const [collections, setCollections] = useState<string[]>([]);
  const [isbn, setIsbn] = useState('');
  const [pages, setPages] = useState('');
  const [firstEdition, setFirstEdition] = useState('');

  const loadReceivedData = (
    item: {
      existing: string[] | null;
      new: string[] | string[][] | null;
    } | null,
    setItemState: React.Dispatch<React.SetStateAction<string[]>>,
    setCounterState: React.Dispatch<React.SetStateAction<number[]>>
  ) => {
    console.log(item);
    if (item && item.existing) {
      const dataArr = item.existing;

      for (let i = 0; i < dataArr.length; i++) {
        const element = item.existing[i];
        if (i === 0) {
          setItemState([element]);
        } else {
          setCounterState(prevState => [...prevState, i]);
          setItemState(prevState => [...prevState, element]);
        }
      }
    }

    if (item && item.new) {
    }
  };

  useEffect(() => {
    uploadedAuthors &&
      loadReceivedData(uploadedAuthors, setAuthors, setAuthorsSelectCounter);
    uploadedGenres &&
      loadReceivedData(uploadedGenres, setGenres, setGenresSelectCounter);
  }, []);

  const [
    addBook,
    { data: mutationData, loading: mutationLoading, error: mutationError },
  ] = useMutation(ADD_BOOK, {
    onCompleted(data) {
      onCompletedMutation(data);
    },
  });

  const onCompletedMutation = (data: any) => {
    if (data.addBook.userErrors[0].message) {
      setUserError(data.addBook.userErrors[0].message);
    }
    if (data.addBook.book) {
      setInCollection(false);
      setAuthorsSelectCounter([0]);
      setCollectionsSelectCounter([0]);
      setGenresSelectCounter([0]);
      setTranslatorsSelectCounter([0]);
      setSuccessMessage(data.addBook.book.title);
      setTitle('');
      setLanguage('POLISH');
      setGenres([]);
      setTranslators([]);
      setAuthors([]);
      setCollections([]);
      setPublisher('');
      setIsbn('');
      setPages('');
      setFirstEdition('');
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    }
  };
  // HANDLE EVENTS

  const handleInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, id } = e.target;
    switch (id) {
      case 'title':
        setTitle(value);
        break;
      case 'pages':
        regexValidator(numbersRegex, value, setPages);
        break;
      case 'isbn':
        setIsbn(value);
        if (value.length >= 10) checkIsbn(e);

        break;
      case 'firstEdition':
        regexValidator(numbersRegex, value, setFirstEdition);
        break;

      default:
        break;
    }
  };

  const handleBookSubmit = () => {
    addBook({
      variables: {
        title,
        authors,
        language,
        pages: pages ? Number(pages) : null,
        isbn,
        firstEdition: firstEdition ? Number(firstEdition) : null,
        bookGenres: genres ? genres : null,
        publisher,
        translators,
        collections,
      },
    });
  };

  // RENDER ELEMENTS
  const showForm = () => {
    return (
      <form className='bookCollection__addBook__bookForm__form addBookForm'>
        <div className='addBookForm_element addBookForm_element_cover'>
          <img src={uploadedCover} alt='' />
        </div>

        <div className='addBookForm_element addBookForm_element_title'>
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
        <div className='addBookForm_element addBookForm_element_language'>
          <label htmlFor='language'>language:</label>
          <select
            id='language'
            name='language'
            onChange={e => setLanguage(e.target.value)}
          >
            <option value={Language.Polish}>{Language.Polish}</option>
            <option value={Language.English}>{Language.English}</option>
          </select>
        </div>
        <div className='addBookForm_element addBookForm_element_genres'>
          {genresSelectCounter.map(input => {
            return (
              <Select
                item='genre'
                id={input}
                key={input}
                data={data.genres}
                selectedValues={genres}
                selectCounter={genresSelectCounter}
                setSelectCounter={setGenresSelectCounter}
                setSelectedValues={setGenres}
                setDuplicationError={setDuplicationError}
              />
            );
          })}
        </div>
        <div className='addBookForm_element addBookForm_element_pages'>
          <label htmlFor='pages'>pages:</label>
          <input
            autoComplete='off'
            id='pages'
            type='text'
            value={pages}
            min={0}
            max={2000}
            step={1}
            onChange={e => handleInputs(e)}
          />
        </div>
        <div className='addBookForm_element addBookForm_element_authors'>
          {authorsSelectCounter.map(input => {
            return (
              <Select
                item='author'
                id={input}
                key={input}
                data={data.authors}
                selectedValues={authors}
                selectCounter={authorsSelectCounter}
                setSelectCounter={setAuthorsSelectCounter}
                setSelectedValues={setAuthors}
                setDuplicationError={setDuplicationError}
              />
            );
          })}
        </div>
        <div className='addBookForm_element addBookForm_element_publisher'>
          <label htmlFor='publisher'>publisher:</label>

          <select
            className='form_select'
            id='publishers'
            name='publishers'
            onChange={e => setPublisher(e.target.value)}
          >
            <option
              value={
                uploadedPublisher?.existing ? uploadedPublisher.existing.id : ''
              }
            >
              {uploadedPublisher?.existing
                ? uploadedPublisher.existing.name
                : '-- find me --'}
            </option>
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
        {language === Language.English && (
          <div className='addBookForm_element addBookForm_element_translators'>
            {translatorsSelectCounter.map(input => {
              return (
                <Select
                  item='translator'
                  id={input}
                  key={input}
                  data={data.translators}
                  selectedValues={translators}
                  selectCounter={translatorsSelectCounter}
                  setSelectCounter={setTranslatorsSelectCounter}
                  setSelectedValues={setTranslators}
                  setDuplicationError={setDuplicationError}
                />
              );
            })}
          </div>
        )}
        <div className='addBookForm_element addBookForm_element_isbn'>
          <label htmlFor='isbn'>isbn</label>
          <input
            name='isbn'
            autoComplete='off'
            id='isbn'
            type='text'
            value={isbn}
            onChange={e => handleInputs(e)}
          />
        </div>
        <div className='addBookForm_element addBookForm_element_firstEdition'>
          <label htmlFor='firstEdition'>first edition(global):</label>
          <input
            autoComplete='off'
            type='text'
            id='firstEdition'
            value={firstEdition}
            onChange={e => handleInputs(e)}
          />
        </div>
        <div className='addBookForm_element addBookForm_element_cover'>
          <label htmlFor='cover'>upload cover</label>
          <input id='cover' type='file' />
        </div>
        <div className='addBookForm_element addBookForm_element_isCollection'>
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
          <div className='aaddBookForm_element addBookForm_element_collections'>
            {collectionsSelectCounter.map(input => {
              return (
                <Select
                  item='collection'
                  id={input}
                  key={input}
                  data={data.collections}
                  selectedValues={collections}
                  selectCounter={collectionsSelectCounter}
                  setSelectCounter={setCollectionsSelectCounter}
                  setSelectedValues={setCollections}
                  setDuplicationError={setDuplicationError}
                />
              );
            })}
          </div>
        )}
        <Button handleClick={handleBookSubmit} text='submit' className='' />
      </form>
    );
  };
  const showErrors = () => {
    if (mutationError) {
      return <Error text={mutationError.message} />;
    } else if (userError) {
      return <Error text={userError} />;
    }
  };
  return (
    <div className='bookCollection__addBook__bookForm'>
      {(loading || mutationLoading) && <LoadingSpinner />}
      {errors && <Error text={errors} />}

      {data && successMessage ? (
        <SuccessMessage item='publisher' successMessage={successMessage} />
      ) : null}

      {data && !loading && !successMessage && showForm()}
      {duplicationError && (
        <Error text='Duplication error(s) detected, correct mistakes before continuing' />
      )}
      {showErrors()}
    </div>
  );
};

export default AddBookForm;
