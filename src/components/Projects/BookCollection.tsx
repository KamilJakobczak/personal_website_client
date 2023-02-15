import { Outlet } from 'react-router-dom';
import Navigation from './book_collection/Navigation';
import Search from './book_collection/Search';

const BookCollection: React.FC = () => {
  const elements = [
    { id: 0, element: 'books' },
    { id: 1, element: 'authors' },
    { id: 2, element: 'publishers' },
    { id: 3, element: 'add' },
  ];

  return (
    <div className='book_collection'>
      <Navigation elements={elements} parentClass='book_collection' />
      <Search />
      <Outlet />
    </div>
  );
};

export default BookCollection;
