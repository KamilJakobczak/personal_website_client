import { useQuery } from '@apollo/client';
import { useState, useEffect } from 'react';
import { LOAD_BOOKS } from '../../../../../GraphQL/queries';
import CustomError from '../../../../CustomError';
import LoadingSpinner from '../../../../LoadingSpinner';
import BookFilters from '../filter/BookFilters';
import List from './List';
import Button from '../general-purpose/Button';
import { useLocation } from 'react-router-dom';

const BookList: React.FC = () => {
  const location = useLocation();
  console.log(location.state);

  const { data, error, loading, refetch } = useQuery(LOAD_BOOKS, {
    fetchPolicy: 'network-only',
    nextFetchPolicy: 'cache-first',
  });

  const [filtersVisible, setFiltersVisible] = useState(false);
  const [higherWidth, setHigherWidth] = useState(false);

  const handleFiltersClick = () => {
    setFiltersVisible(prevState => !prevState);
  };
  const hideFilters = () => {
    setFiltersVisible(false);
  };
  useEffect(() => {
    if (location.state?.refetch) {
      refetch();
    }
  }, [location.state, refetch]);

  const windowResize = () => {
    const width = window.innerWidth;
    if (width > 1025) {
      setFiltersVisible(true);
      setHigherWidth(true);
    } else {
      setFiltersVisible(false);
      setHigherWidth(false);
    }
  };
  useEffect(() => {
    if (window.innerWidth > 1024) {
      setHigherWidth(true);
      setFiltersVisible(true);
    }
    window.addEventListener('resize', windowResize);

    return () => {
      window.removeEventListener('resize', windowResize);
    };
  }, []);

  const showFilters = () => {
    return (
      <>
        {filtersVisible && !higherWidth && (
          <Button
            className='bookCollection__books__filter_hideButton'
            text='hide filters'
            handleClick={handleFiltersClick}
          />
        )}
        {filtersVisible ? <BookFilters refetchQuery={refetch} hideWhenDone={hideFilters} /> : null}
        {/* {filtersVisible ? (
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
        )} */}
        {filtersVisible ? null : (
          <Button
            className='bookCollection__books__filter_showButton'
            text='show filters'
            handleClick={handleFiltersClick}
          />
        )}
      </>
    );
  };
  return (
    <div className='bookCollection__books'>
      <div className='bookCollection__books__filter'>{showFilters()}</div>
      {data && (
        <div className='bookCollection__books__list bookCollection__list'>
          <List data={data.books} />
        </div>
      )}
      {error && <CustomError text={error.message} />}
      {loading && <LoadingSpinner />}
    </div>
  );
};

export default BookList;
