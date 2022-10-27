import React from 'react';
import { useQuery } from '@apollo/client';
import { useLocation } from 'react-router-dom';
import { LOAD_BOOK } from '../../../GraphQL/queries';
import LoadingSpinner from '../../LoadingSpinner';
import Error from '../../Error';
// interface BookProps {
//   bookId: string;
// }

const Book: React.FC = () => {
  const location = useLocation();
  const { bookId } = location.state;

  const { error, loading, data } = useQuery(LOAD_BOOK, {
    variables: { id: bookId },
  });
  console.log(data);

  const bookElement = () => {
    return (
      <>
        <div className='book_title'>
          <h4>{data.book.title}</h4>
        </div>
        <div className='book__cover'>
          <div className='book__cover_img'>
            <img src='' alt='' />
          </div>
        </div>
        <div className='book__data'>
          <div className='book__data_element'>
            <p className='book__data_element_key'>Author:</p>
            <p className='book__data_element_value'>
              {data.book.authors[0].name}
            </p>
          </div>

          <div className='book__data_element'>
            <p className='book__data_element_key'>Genre:</p>
            <p className='book__data_element_value'>
              {data.book.bookGenres[0].name}
            </p>
          </div>
          <div className='book__data_element'>
            <p className='book__data_element_key'>Pages:</p>
            <p className='book__data_element_value'>{data.book.pages}</p>
          </div>
          <div className='book__data_element'>
            <p className='book__data_element_key'>Language:</p>
            <p className='book__data_element_value'>{data.book.language}</p>
          </div>
          <div className='book__data_element'>
            <p className='book__data_element_key'>Publisher:</p>
            <p className='book__data_element_value'>
              {data.book.publisher.name}
            </p>
          </div>

          <div className='book__data_element'>
            <p className='book__data_element_key'>First edition:</p>
            <p className='book__data_element_value'>{data.book.firstEdition}</p>
          </div>
          <div className='book__data_element'>
            <p className='book__data_element_key'>ISBN:</p>
            <p className='book__data_element_value'>{data.book.isbn}</p>
          </div>
        </div>
      </>
    );
  };
  return (
    <div className='book'>
      {loading && <LoadingSpinner />}
      {error && <Error text={error.message} />}
      {data && bookElement()}
    </div>
  );
};

export default Book;
