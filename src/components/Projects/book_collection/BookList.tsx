import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { LOAD_BOOKS } from '../../../GraphQL/queries';
import Error from '../../Error';
import LoadingSpinner from '../../LoadingSpinner';
import BookFilters from './BookFilters';
import List from './List';
import Button from './Button';

const BookList: React.FC = () => {
  const { data, error, loading, refetch } = useQuery(LOAD_BOOKS, {
    fetchPolicy: 'network-only',
    nextFetchPolicy: 'cache-first',
  });

  const [filtersVisible, setFiltersVisible] = useState(false);

  const handleFiltersClick = () => {
    setFiltersVisible(prevState => !prevState);
  };
  const hideFilters = () => {
    setFiltersVisible(false);
  };

  const showContent = () => {
    return (
      <>
        {filtersVisible ? (
          <BookFilters refetchQuery={refetch} hideWhenDone={hideFilters} />
        ) : null}
        {filtersVisible ? (
          <Button
            className='book_collection__books__filter_hideButton'
            text='click to hide filters'
            handleClick={handleFiltersClick}
          />
        ) : (
          <Button
            className='book_collection__books__filter_showButton'
            text='click to expand filters'
            handleClick={handleFiltersClick}
          />
        )}
        {data && (
          <div className='book_collection__books_list book_collection__list'>
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
