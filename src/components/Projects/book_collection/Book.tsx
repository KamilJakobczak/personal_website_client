import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { imageApi } from '../../../server';
import { resizeHelper } from './handlers/resizeHelper';

interface BookProps {
  data: {
    id: string;
    title: string;
    language: string;
    authors: {
      id: string;
      firstName: string;
      lastName: string;
    }[];
    translators: string[];
    bookGenres: {
      name: string;
    }[];
    pages: number;
    publisher: {
      id: string;
      name: string;
    };
    isbn: string;
    firstEdition: number;
  };
}

const Book: React.FC<BookProps> = ({ data }) => {
  const { authors, bookGenres, publisher } = data;
  const [coverSize, setCoverSize] = useState('');

  useEffect(() => {
    resizeHelper(window.innerWidth, setCoverSize);
  }, []);

  useEffect(() => {
    function handleResize() {
      const currentWidth = window.innerWidth;
      resizeHelper(currentWidth, setCoverSize);
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  const showAuthors = () => {
    let counter = 1;
    return authors.map(author => {
      const { id } = author;
      const pathId = author.id.slice(-10);
      if (counter === authors.length) {
        return (
          <span key={id}>
            <Link to={`../authors/${pathId}`} state={{ id }}>
              {author.firstName.concat(' ', author.lastName)}
            </Link>
          </span>
        );
      } else {
        counter++;
        return (
          <span key={id}>
            <Link to={`../authors/${pathId}`} state={{ id }}>
              {author.firstName.concat(' ', author.lastName, ',')}
            </Link>
          </span>
        );
      }
    });
  };

  const showGenres = () => {
    let counter = 1;
    if (counter === bookGenres.length) {
      return bookGenres.map(genre => {
        return <span key={genre.name}>{genre.name}</span>;
      });
    } else {
      counter++;
      return bookGenres.map(genre => {
        return <span key={genre.name}>{genre.name.concat(',')}</span>;
      });
    }
  };

  const showPublisher = () => {
    const { id, name } = publisher;
    const pathId = id.slice(-10);
    return (
      <span>
        <Link to={`../publishers/${pathId}`} state={{ id }}>
          {name}
        </Link>
      </span>
    );
  };

  return (
    <div className='book'>
      <h4 className='book__title'>{data.title}</h4>
      <div className='book__cover'>
        <div className='book__cover_img'>
          <img
            src={`${imageApi}/covers/${data.id}/${coverSize}`}
            alt='book_cover'
          />
        </div>
      </div>
      <div className='book__data'>
        <p className='book__data_authors'>
          Authors: <span>{showAuthors()}</span>
        </p>
        <p className='book__data_genres'>Genre: {showGenres()}</p>
        <p className='book__data_pages'>
          Pages: <span>{data.pages}</span>
        </p>
        <p className='book__data_language'>
          Language: <span>{data.language}</span>
        </p>
        <p className='book__data_publisher'>Publisher: {showPublisher()}</p>

        <p className='book__data_firstEdition'>
          First edition: <span>{data.firstEdition}</span>
        </p>
        <p className='book__data_isbn'>
          ISBN: <span>{data.isbn}</span>
        </p>
      </div>
    </div>
  );
};

export default Book;
