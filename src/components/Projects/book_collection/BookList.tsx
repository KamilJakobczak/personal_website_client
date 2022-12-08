import { useQuery } from '@apollo/client';
import { LOAD_BOOKS } from '../../../GraphQL/queries';
import Error from '../../Error';
import LoadingSpinner from '../../LoadingSpinner';
import BookFilters from './BookFilters';
import List from './List';

const BookList: React.FC = () => {
  const { data, error, loading, refetch } = useQuery(LOAD_BOOKS);

  const showContent = () => {
    return (
      <>
        <BookFilters refetchQuery={refetch} />
        {data && (
          <div className='book_collection__books_list'>
            <List data={data.books} />
          </div>
        )}
      </>
    );
  };
  return (
    <div className='book_collection__books'>
      {showContent()}
      {error && <Error text={error.message} />}
      {loading && <LoadingSpinner />}
    </div>
  );
};

export default BookList;
