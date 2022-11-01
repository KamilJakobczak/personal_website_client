import React from 'react';

interface BookProps {
  data: {
    title: string;
    language: string;
    authors: string[];
    translators: string[];
    bookGenres: string[];
    pages: number;
    publisher: string;
    isbn: string;
    firstEdition: number;
  };
}

const Book: React.FC<BookProps> = ({ data }) => {
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
          {/* <p className='book__data_element_value'>{data.authors[0].name}</p> */}
        </div>

        <div className='book__data_element'>
          <p className='book__data_element_key'>Genre:</p>
          {/* <p className='book__data_element_value'>
      {data.bookGenres[0].name}
    </p> */}
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
          {/* <p className='book__data_element_value'>{data.publisher.name}</p> */}
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
