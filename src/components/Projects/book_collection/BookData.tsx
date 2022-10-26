import React from 'react';
import { useQuery } from '@apollo/client';
// import { LOAD_BOOK } from '../GraphQL/Queries';

interface BookDataProps {
  bookId: string;
}

const BookData: React.FC<BookDataProps> = ({ bookId }) => {
  // const {data.book, setBookInfo] = useState('');

  // const { error, loading, data } = useQuery(LOAD_BOOK, {
  //   variables: { bookId },
  // });
  // if (loading) return 'Loading...';

  return (
    <div className='bookData'>
      <div className='bookData_element'>
        <p className='key'>Title:</p>
        {/* <p className='value'>{data.book.title}</p> */}
      </div>
      <div className='bookData_element'>
        <p className='key'>Author:</p>
        {/* <p className='value'>{data.book.author.name}</p> */}
      </div>
      <div className='bookData_element'>
        <p className='key'>Publisher:</p>
        {/* <p className='value'>{data.book.publisher.name}</p> */}
      </div>
      <div className='bookData_element'>
        <p className='key'>Genre:</p>
        {/* <p className='value'>{data.book.genre}</p> */}
      </div>
      <div className='bookData_element'>
        <p className='key'>Pages:</p>
        {/* <p className='value'>{data.book.pages}</p> */}
      </div>
      <div className='bookData_element'>
        <p className='key'>Rating:</p>
        <p className='value'>
          {/* {data.book.rating === -1 ? 'Not rated' : data.book.rating} */}
        </p>
      </div>
      <div className='bookData_element'>
        <p className='key'>Cover:</p>
        {/* <p className='value'>{data.book.cover}</p> */}
      </div>
      <div className='bookData_element'>
        <p className='key'>ISBN</p>
        {/* <p className='value'>{data.book.isbn}</p> */}
      </div>
      <div className='bookData_element'>
        <p className='key'>First edition:</p>
        {/* <p className='value'>{data.book.firstEdition}</p> */}
      </div>
      <div className='bookData_element'>
        <p className='key'>My edition:</p>
        {/* <p className='value'>{data.book.myEdition}</p> */}
      </div>
      <div className='bookData_element'>
        <p className='key'>Status:</p>
        {/* <p className='value'>{data.book.status}</p> */}
      </div>
      <div className='bookData_element'>
        <p className='key'>Bought for:</p>
        <p className='value'>
          {/* {data.book.buyPrice} {data.book.currency} */}
        </p>
      </div>
    </div>
  );
};

export default BookData;
