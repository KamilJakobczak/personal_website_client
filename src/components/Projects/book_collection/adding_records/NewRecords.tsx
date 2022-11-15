import AddPublisher from './AddPublisher';
import { useEffect, useState } from 'react';
import AddTranslator from './AddTranslator';
import AddBook from './AddBook';
import AddGenre from './AddGenre';
import AddCollection from './AddCollection';
import AddAuthor from './AddAuthor';
import { history } from '../../../../routes/history';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';

interface NewRecordsProps {
  resetComponent: string;
  resetBooleans: boolean;
}

const NewRecords: React.FC = props => {
  const [buttons, setButtons] = useState(true);
  const [book, setBook] = useState(false);

  const showBookOptions = () => {
    return (
      <div>
        <button className='collection_button' onClick={e => {}}>
          <Link to={'/apps/collection/add/book/upload'}>
            upload an epub file
          </Link>
        </button>
        <button className='collection_button'>
          <Link to={'/apps/collection/add/book'}>input info by yourself</Link>{' '}
        </button>

        <button
          className='collection_button'
          onClick={e => {
            setButtons(true);
            setBook(false);
          }}
        >
          whoops, missclick, go back
        </button>
      </div>
    );
  };

  const showButtons = () => {
    return (
      <>
        <div
          className='new_records__item collection_button'
          onClick={e => {
            setBook(true);
            setButtons(false);
          }}
        >
          book
        </div>
        <div className='new_records__item collection_button'>
          <Link to={'/apps/collection/add/author'}>author</Link>
        </div>
        <div className='new_records__item collection_button'>
          <Link to={'/apps/collection/add/genre'}>genre</Link>
        </div>
        <div className='new_records__item collection_button'>
          <Link to={'/apps/collection/add/publisher'}>publisher</Link>
        </div>
        <div className='new_records__item collection_button'>
          <Link to={'/apps/collection/add/translator'}>translator</Link>
        </div>
        <div className='new_records__item collection_button'>
          <Link to={'/apps/collection/add/collection'}>collection</Link>
        </div>
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
