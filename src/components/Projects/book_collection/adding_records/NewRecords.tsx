import { useState } from 'react';

import { Link } from 'react-router-dom';
import Button from '../Button';

// interface NewRecordsProps {
//   resetComponent: string;
//   resetBooleans: boolean;
// }

const NewRecords: React.FC = () => {
  const [buttons, setButtons] = useState(true);
  const [book, setBook] = useState(false);

  const showBookOptions = () => {
    return (
      <div className='new_records__add_book_options'>
        <Button
          className='new_records__add_book_options__button'
          text='go back'
          handleClick={() => {
            setButtons(true);
            setBook(false);
          }}
        />
        <Button
          className='new_records__add_book_options__button'
          linkPath='/apps/collection/add/book/upload'
          text='upload an epub file'
        />
        <Button
          className='new_records__add_book_options__button'
          linkPath='/apps/collection/add/book'
          text='input info by yourself'
        />
      </div>
    );
  };

  const handleBookButtonClick = () => {
    setBook(true);
    setButtons(false);
  };

  const showButtons = () => {
    const elements = [
      'author',
      'genre',
      'publisher',
      'translator',
      'collection',
    ];
    return (
      <>
        <Button
          className='new_records__item'
          text='book'
          handleClick={handleBookButtonClick}
        />
        {elements.map(element => {
          return (
            <Button
              key={element}
              className='new_records__item'
              text={element}
              linkPath='/apps/collection/add'
            />
          );
        })}
      </>
    );
  };

  return (
    <div className='new_records'>
      {book && showBookOptions()}
      {buttons && showButtons()}
    </div>
  );
};
export default NewRecords;
