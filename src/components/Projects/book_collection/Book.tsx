import React from 'react';
import { Link } from 'react-router-dom';

interface BookProps {
  data: {
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

  const showAuthors = () => {
    return authors.map(author => {
      const { id } = author;
      const pathId = author.id.slice(-10);
      return (
        <span className='book__data_element_value_span' key={id}>
          <Link to={`../authors/${pathId}`} state={{ id }}>
            {author.firstName.concat(' ', author.lastName)}
          </Link>
        </span>
      );
    });
  };

  const showGenres = () => {
    return bookGenres.map(genre => {
      return (
        <span key={genre.name} className='book__data_element_value_span'>
          {genre.name}
        </span>
      );
    });
  };

  const showPublisher = () => {
    const { id, name } = publisher;
    const pathId = id.slice(-10);
    return (
      <span className='book__data_element_value_span'>
        <Link to={`../publishers/${pathId}`} state={{ id }}>
          {name}
        </Link>
      </span>
    );
  };

  return (
    <div className='book'>
      <div className='book_title'>
        <h4>{data.title}</h4>
      </div>
      <div className='book__cover'>
        <div className='book__cover_img'>
          <img src='' alt='' />
        </div>
      </div>
      <div className='book__data'>
        <div className='book__data_element'>
          <p className='book__data_element_key'>Author:</p>
          <div className='book__data_element_value'>{showAuthors()}</div>
        </div>

        <div className='book__data_element'>
          <p className='book__data_element_key'>Genre:</p>
          <div className='book__data_element_value'>{showGenres()}</div>
        </div>
        <div className='book__data_element'>
          <p className='book__data_element_key'>Pages:</p>
          <p className='book__data_element_value'>{data.pages}</p>
        </div>
        <div className='book__data_element'>
          <p className='book__data_element_key'>Language:</p>
          <p className='book__data_element_value'>{data.language}</p>
        </div>
        <div className='book__data_element'>
          <p className='book__data_element_key'>Publisher:</p>
          <div className='book__data_element_value'>{showPublisher()}</div>
        </div>

        <div className='book__data_element'>
          <p className='book__data_element_key'>First edition:</p>
          <p className='book__data_element_value'>{data.firstEdition}</p>
        </div>
        <div className='book__data_element'>
          <p className='book__data_element_key'>ISBN:</p>
          <p className='book__data_element_value'>{data.isbn}</p>
        </div>
      </div>
    </div>
  );
};

export default Book;
