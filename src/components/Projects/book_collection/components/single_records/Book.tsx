import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { imageApi } from '../../../../../server';
import { resizeHelper } from '../../utility/handlers/resizeHelper';
import { useCoverResize } from '../../utility/hooks/useCoverResize';

interface BookProps {
  data: {
    id: string;
    title: string;
    titleEnglish: string;
    titleOriginal: string;
    language: string;
    authors: {
      id: string;
      firstName: string;
      lastName: string;
    }[];
    translators: {
      id: string;
      firstName: string;
      lastName: string;
    }[];
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
  console.log(data);
  const {
    authors,
    bookGenres,
    publisher,
    translators,
    titleEnglish,
    titleOriginal,
  } = data;
  const { coverSize } = useCoverResize();

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

  const showTranslators = () => {
    let counter = 1;
    return translators.map(translator => {
      const { id } = translator;
      // const pathId = translator.id.slice(-10);
      if (counter === translators.length) {
        return (
          <span key={id}>
            {/* <Link to={`../translators/${pathId}`} state={{ id }}> */}
            {translator.firstName.concat(' ', translator.lastName)}
            {/* </Link> */}
          </span>
        );
      } else {
        counter++;
        return (
          <span key={id}>
            {/* <Link to={`../translators/${pathId}`} state={{ id }}> */}
            {translator.firstName.concat(' ', translator.lastName, ',')}
            {/* </Link> */}
          </span>
        );
      }
    });
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
        <div className='book__data_authors'>
          <p>{authors.length === 1 ? 'Author' : 'Authors'}</p>
          <span>-</span>
          <span>{showAuthors()}</span>
        </div>
        <div className='book__data_genres'>
          <p>{bookGenres.length === 1 ? 'Genre' : 'Genres'}</p>
          <span>-</span>
          <span>{showGenres()}</span>
        </div>
        <div className='book__data_pages'>
          <p>Pages</p>
          <span>-</span>
          <span>{data.pages}</span>
        </div>
        <div className='book__data_language'>
          <p>Language</p>
          <span>-</span>
          <span>{data.language}</span>
        </div>
        <div className='book__data_publisher'>
          <p>Publisher</p>
          <span>-</span>
          <span>{showPublisher()}</span>
        </div>
        <div className='book__data_firstEdition'>
          <p>First edition</p>
          <span>-</span>
          <span>{data.firstEdition}</span>
        </div>
        <div className='book__data_isbn'>
          <p>ISBN</p>
          <span>-</span>
          <span>{data.isbn}</span>
        </div>
        {translators ? (
          <div className='book__data_translators'>
            <p>{translators.length === 1 ? 'Translator' : 'Translators'}</p>
            <span>-</span>
            <span>{showTranslators()}</span>
          </div>
        ) : null}
        {titleEnglish ? (
          <div className='book__data_titleEnglish'>
            <p>English title</p>
            <span>-</span>
            <span>{titleEnglish}</span>
          </div>
        ) : null}
        {titleOriginal ? (
          <div className='book__data_titleOriginal'>
            <p>Original title</p>
            <span>-</span>
            <span>{titleOriginal}</span>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Book;
