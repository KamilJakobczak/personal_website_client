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
        {filtersVisible && (
          <Button
            className='bookCollection__books__filter_hideButton'
            text='hide filters'
            handleClick={handleFiltersClick}
          />
        )}
        {filtersVisible ? (
          <BookFilters refetchQuery={refetch} hideWhenDone={hideFilters} />
        ) : null}
        {filtersVisible ? (
          <Button
            className='bookCollection__books__filter_hideButton'
            text='hide filters'
            handleClick={handleFiltersClick}
          />
        ) : (
          <Button
            className='bookCollection__books__filter_showButton'
            text='expand filters'
            handleClick={handleFiltersClick}
          />
        )}
        {data && (
          <div className='bookCollection__books_list bookCollection__list'>
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
