import { useState, useEffect } from 'react';
import AddAuthor from './AddAuthorForm';
import AddBookForm, { AddBookFormProps } from './AddBookForm';
import AddGenre from './AddGenreForm';
import AddPublisherForm from './AddPublisherForm';
import UploadBookForm from './UploadBookForm';

export interface ParsedDataInterface {
  authors: {
    existing: string[] | null;
    new:
      | {
          firstName: string;
          secondName: string;
          thirdName: string;
          lastName: string;
        }[]
      | null;
  } | null;
  genres: { existing: string[] | null; new: string[] | null } | null;
  publisher: {
    existing: { id: string; name: string };
    new: string | null;
  } | null;
  title?: string;
  language?: string;
  cover?: string;
  description?: string;
}

const UploadBook: React.FC = () => {
  const [parsedData, setParsedData] = useState<ParsedDataInterface>();
  const [updatedData, setUpdatedData] = useState<{
    title: string;
    authors: string[] | null;
    genres: string[] | null;
    publisher: {
      id: string;
      name: string;
    } | null;
    description: string;
    language: string;
    cover: string;
  }>();
  const [newAuthors, setNewAuthors] = useState<Array<{
    firstName: string;
    secondName: string;
    thirdName: string;
    lastName: string;
  }> | null>(null);
  const [authorsAdded, setAuthorsAdded] = useState<Array<string>>([]);

  const [newGenres, setNewGenres] = useState<Array<string> | null>(null);
  const [genresAdded, setGenresAdded] = useState<Array<string>>([]);

  const [newPublisher, setNewPublisher] = useState<string | null>();
  const [publisherAdded, setPublisherAdded] = useState('');

  useEffect(() => {
    if (parsedData) {
      if (parsedData.authors && !newAuthors) {
        setNewAuthors(parsedData.authors.new);
        console.log('new authors');
      }
      if (parsedData.genres && !newGenres) {
        setNewGenres(parsedData.genres.new);
        console.log('new genres');
      }
      if (parsedData.publisher && !newPublisher) {
        setNewPublisher(parsedData.publisher.new);
        console.log('new publisher');
      }
    }
    /*eslint-disable*/
  }, [parsedData]);
  /*eslint-enable*/

  useEffect(() => {
    if (
      authorsAdded.length === newAuthors?.length &&
      authorsAdded.includes(' ') === false &&
      genresAdded.length === newGenres?.length &&
      genresAdded.includes(' ') === false &&
      publisherAdded.includes(' ') === false
    ) {
      updateData();
    } else if (
      parsedData?.authors?.existing ||
      parsedData?.genres?.existing ||
      parsedData?.publisher?.existing
    ) {
      updateData();
    }
  }, [parsedData, authorsAdded, genresAdded, publisherAdded]);

  const showAddAuthor = () => {
    return (
      newAuthors &&
      newAuthors.map(author => {
        return (
          <div
            className='bookCollection__addBook__upload_addAuthor'
            key={author.lastName}
          >
            <AddAuthor
              goBackButton={false}
              className='bookCollection__addBook__upload_addAuthor'
              author={author}
              onAdded={setAuthorsAdded}
            />
          </div>
        );
      })
    );
  };

  const showAddGenre = () => {
    return (
      newGenres &&
      newGenres.map(genre => {
        return (
          <div className='bookCollection__addBook__upload_addGenre' key={genre}>
            <AddGenre
              goBackButton={false}
              className='bookCollection__addBook__upload_addGenre'
              genre={genre}
              onAdded={setGenresAdded}
            />
          </div>
        );
      })
    );
  };
  const showAddPublisher = () => {
    return (
      newPublisher && (
        <div>
          <AddPublisherForm
            goBackButton={false}
            className='bookCollection__addBook__upload_addPublisher'
            publisher={newPublisher}
            onAdded={setPublisherAdded}
          />
        </div>
      )
    );
  };

  const updateData = () => {
    if (parsedData) {
      const mergedAuthors = () => {
        if (parsedData.authors) {
          if (parsedData.authors.existing) {
            if (authorsAdded.length > 0 && !authorsAdded.includes(' ')) {
              return [...parsedData.authors.existing, ...authorsAdded];
            }
            return parsedData.authors.existing;
          } else {
            if (authorsAdded.length > 0 && !authorsAdded.includes(' ')) {
              return authorsAdded;
            }
          }
        }
        return null;
      };

      const mergedGenres = () => {
        if (parsedData.genres) {
          if (parsedData.genres.existing) {
            if (genresAdded.length > 0 && !genresAdded.includes(' ')) {
              return [...parsedData.genres.existing, ...genresAdded];
            }
            return parsedData.genres.existing;
          } else {
            if (genresAdded.length > 0 && !genresAdded.includes(' ')) {
              return genresAdded;
            }
          }
        }
        return null;
      };
      const mergedPublisher = () => {
        if (parsedData.publisher) {
          if (parsedData.publisher.existing) {
            return parsedData.publisher.existing;
          } else if (parsedData.publisher.new) {
            if (publisherAdded.length > 1) {
              return { id: publisherAdded, name: parsedData.publisher.new };
            }
          }
        }
        return null;
      };

      const updatedDataObj = {
        title: parsedData.title || '',
        authors: mergedAuthors(),
        genres: mergedGenres(),
        publisher: mergedPublisher(),
        description: parsedData.description || '',
        language: parsedData.language || '',
        cover: parsedData.cover || '',
      };
      setUpdatedData(updatedDataObj);
    }
  };

  return (
    <div className='bookCollection__addBook__upload'>
      {!parsedData && <UploadBookForm setParsedData={setParsedData} />}
      {parsedData?.authors?.new && showAddAuthor()}
      {parsedData?.genres?.new && showAddGenre()}
      {parsedData?.publisher?.new && showAddPublisher()}
      {updatedData && <AddBookForm epubData={updatedData} />}
    </div>
  );
};
export default UploadBook;
