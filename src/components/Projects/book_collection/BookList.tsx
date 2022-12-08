import { useQuery } from '@apollo/client';
import { LOAD_BOOKS } from '../../../GraphQL/queries';
import BookFilters from './BookFilters';
import List from './List';

const BookList: React.FC = () => {
  const { data, error, loading } = useQuery(LOAD_BOOKS);

  return (
    <div className='book_collection__books'>
      <BookFilters />
      {data && (
        <div className='book_collection__books_list'>
          <List data={data.books} />
        </div>
      )}
    </div>
  );
};

export default BookList;
