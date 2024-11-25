import { useQuery } from '@apollo/client';
import { useState, useEffect } from 'react';
import { LOAD_BOOKS_FEED } from '../../../../../GraphQL/queries';
import CustomError from '../../../../CustomError';
import LoadingSpinner from '../../../../LoadingSpinner';
import BookFilters from '../filter/BookFilters';
import List from './List';
import Button from '../general-purpose/Button';
import { useLocation } from 'react-router-dom';

const BookList: React.FC = () => {
  const location = useLocation();

  const [filtersVisible, setFiltersVisible] = useState(false);
  const [higherWidth, setHigherWidth] = useState(false);
  const [activePage, setActivePage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const { data, error, loading, refetch } = useQuery(LOAD_BOOKS_FEED, {
    variables: {
      input: {
        offset: (activePage - 1) * 10,
        limit: 10,
      },
    },
    fetchPolicy: 'cache-and-network',
  });
  // Refetch data if needed
  useEffect(() => {
    if (location.state?.refetch) {
      refetch();
    }
  }, [location.state, refetch]);
  // Set number of pages
  useEffect(() => {
    if (data?.booksFeed?.totalCount) {
      setTotalPages(Math.ceil(data.booksFeed.totalCount / 10));
    }
  }, [data]);
  // Handle list filters visability
  const handleFiltersClick = () => {
    setFiltersVisible(prevState => !prevState);
  };
  const hideFilters = () => {
    setFiltersVisible(false);
  };
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width > 1025) {
        setFiltersVisible(true);
        setHigherWidth(true);
      } else {
        setFiltersVisible(false);
        setHigherWidth(false);
      }
    };
    handleResize();
    // Set initial state based on current window size
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const showFilters = () => (
    <>
      {filtersVisible && !higherWidth && (
        <Button
          className='bookCollection__books__filter_hideButton'
          text='hide filters'
          handleClick={handleFiltersClick}
        />
      )}
      {filtersVisible ? (
        <BookFilters refetchQuery={refetch} hideWhenDone={hideFilters} />
      ) : (
        <Button
          className='bookCollection__books__filter_showButton'
          text='show filters'
          handleClick={handleFiltersClick}
        />
      )}
    </>
  );

  return (
    <div className='bookCollection__books'>
      <div className='bookCollection__books__filter'>{showFilters()}</div>
      {data?.booksFeed?.books?.length > 0 && !error && !loading && (
        <div className='bookCollection__books__list bookCollection__list'>
          <List data={data.booksFeed.books} pagination={{ activePage, totalPages, setActivePage }} />
        </div>
      )}
      {error && <CustomError text={error.message} />}
      {loading && <LoadingSpinner />}
    </div>
  );
};

export default BookList;
