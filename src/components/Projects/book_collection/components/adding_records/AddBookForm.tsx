import { useQueries } from '../../utility/hooks/useQueries';
import Select from '../general-purpose/Select';
import { useState, useEffect } from 'react';
import LoadingSpinner from '../../../../LoadingSpinner';
import Error from '../../../../Error';
import { regexValidator } from '../../utility/handlers';
import { numbersRegex } from '../../utility/regex';
import { checkIsbn } from '../../utility/handlers/checkIsbn';
import { useMutation } from '@apollo/client';
import { ADD_BOOK } from '../../../../../GraphQL/mutations';
import SuccessMessage from '../general-purpose/SuccessMessage';
import Button from '../general-purpose/Button';
import FileInput from '../general-purpose/FileInput';
import axios from 'axios';
import { imageApi } from '../../../../../server';

export interface AddBookFormProps {
  epubData?: {
    title: string;
    authors: string[] | null;
    genres: string[] | null;
    publisher: { id: string; name: string } | null;
    description: string;
    language: string;
    cover: string;
  };
}

enum Language {
  Polish = 'Polish',
  English = 'English',
}
const AddBookForm: React.FC<AddBookFormProps> = ({ epubData }) => {
  // FETCHING DATA
  console.log(epubData);
  const { data, errors, loading } = useQueries();
  const uploadedAuthors = epubData?.authors;
  const uploadedGenres = epubData?.genres;
  const uploadedDescription = epubData?.description;
  const uploadedPublisher = epubData?.publisher;
  const uploadedTitle = epubData?.title;
  const uploadedLanguage = epubData?.language;
  const uploadedCover = epubData?.cover;

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
  const [titleEnglish, setTitleEnglish] = useState('');
  const [titleOriginal, setTitleOriginal] = useState('');
  const [language, setLanguage] = useState(uploadedLanguage || 'Polish');
  const [genres, setGenres] = useState<string[]>([]);
  const [publisher, setPublisher] = useState(uploadedPublisher || '');
  const [translators, setTranslators] = useState<string[]>([]);
  const [authors, setAuthors] = useState<string[]>([]);
  const [collections, setCollections] = useState<string[]>([]);
  const [cover, setCover] = useState<File | null>();
  const [isbn, setIsbn] = useState('');
  const [pages, setPages] = useState('');
  const [firstEdition, setFirstEdition] = useState('');

  const loadReceivedData = (
    item: string[] | null,
    setItemState: React.Dispatch<React.SetStateAction<string[]>>,
    setCounterState: React.Dispatch<React.SetStateAction<number[]>>
  ) => {
    console.log(item);
    if (item) {
      const dataArr = item;

      for (let i = 0; i < dataArr.length; i++) {
        const element = item[i];
        if (i === 0) {
          setItemState([element]);
        } else {
          setCounterState(prevState => [...prevState, i]);
          setItemState(prevState => [...prevState, element]);
        }
      }
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
  const uploadCover = (id: string) => {
    axios
      .post(
        `${imageApi}/uploaded/covers`,
        {
          file: cover,
          id: id,
        },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )
      .then(({ status, data }) => {
        if (status === 200) {
          setCover(null);
          console.log(data);
        }
      });
  };

  const onCompletedMutation = (data: any) => {
    if (data.addBook.userErrors[0].message) {
      setUserError(data.addBook.userErrors[0].message);
    }
    if (data.addBook.book) {
      uploadCover(data.addBook.book.id);
      setInCollection(false);
      setAuthorsSelectCounter([0]);
      setCollectionsSelectCounter([0]);
      setGenresSelectCounter([0]);
      setTranslatorsSelectCounter([0]);
      setSuccessMessage(data.addBook.book.title);
      setTitle('');
      setTitleEnglish('');
      setTitleOriginal('');
      setLanguage('Polish');
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

  const handleCoverUpload = (files: FileList) => {
    const validExtensions = ['.jpg', '.jpeg', '.png'];
    const validSize = 5000000;
    if (files) {
      const coverFile = files[0];
      const checkFileExt = () => {
        for (let i = 0; i < validExtensions.length; i++) {
          if (coverFile.name.endsWith(validExtensions[i])) {
            return true;
          } else {
            return false;
          }
        }
      };
      if (checkFileExt() && coverFile.size < validSize) {
        setCover(coverFile);
      } else {
        alert(
          `Sorry, ${
            coverFile.name
          } is invalid, allowed extensions are ${validExtensions.join(', ')}`
        );
      }
    }
  };

  const handleBookSubmit = () => {
    addBook({
      variables: {
        title,
        titleEnglish,
        titleOriginal,
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
          <label htmlFor='title'>title</label>
          <input
            value={title}
            id='title'
            type='text'
            autoComplete='off'
            required
            onChange={e => setTitle(e.target.value)}
          />
        </div>
        <div className='addBookForm_element addBookForm_element_title'>
          <label htmlFor='titleEnglish'>English title</label>
          <input
            value={titleEnglish}
            id='titleEnglish'
            type='text'
            autoComplete='off'
            onChange={e => setTitleEnglish(e.target.value)}
          />
        </div>
        <div className='addBookForm_element addBookForm_element_title'>
          <label htmlFor='titleOriginal'>Original title</label>
          <input
            value={titleOriginal}
            id='titleOriginal'
            type='text'
            autoComplete='off'
            required
            onChange={e => setTitleOriginal(e.target.value)}
          />
        </div>
        <div className='addBookForm_element addBookForm_element_language'>
          <label htmlFor='language'>language</label>
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
          <label htmlFor='pages'>pages</label>
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
          <label htmlFor='publisher'>publisher</label>
          <select
            className='form_select'
            id='publishers'
            name='publishers'
            onChange={e => setPublisher(e.target.value)}
          >
            <option value={uploadedPublisher?.id || ''}>
              {uploadedPublisher?.name || '-- find me --'}
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

        {language === Language.Polish && (
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
          <label htmlFor='firstEdition'>first edition</label>
          <input
            autoComplete='off'
            type='text'
            id='firstEdition'
            value={firstEdition}
            onChange={e => handleInputs(e)}
          />
        </div>
        <div className='addBookForm_element addBookForm_element_cover-upload'>
          <label htmlFor='cover'>upload cover</label>
          <FileInput
            id='cover'
            fileList={cover ? [cover] : []}
            onChange={handleCoverUpload}
          />
        </div>
        <div className='addBookForm_element addBookForm_element_isCollection'>
          <label htmlFor='in_collection'>Part of a collection?</label>
          <label htmlFor='yes' className='form-control-radio'>
            <input
              type='radio'
              name='in_collection'
              id='yes'
              onClick={() => setInCollection(true)}
            />
            Yes
          </label>
          <label htmlFor='no' className='form-control-radio'>
            <input
              type='radio'
              name='in_collection'
              id='no'
              onClick={() => setInCollection(false)}
            />
            No
          </label>
        </div>
        {inCollection && (
          <div className='addBookForm_element addBookForm_element_collections'>
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
        <SuccessMessage item='book' successMessage={successMessage} />
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
