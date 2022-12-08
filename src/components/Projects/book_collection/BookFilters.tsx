import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { LOAD_GENRES, LOAD_PUBLISHERS } from '../../../GraphQL/queries';
import Filter from './Filter';
import { ApolloQueryResult, OperationVariables } from '@apollo/client';
import Error from '../../Error';

interface BookFiltersProps {
  refetchQuery: (
    variables?: Partial<OperationVariables> | undefined
  ) => Promise<ApolloQueryResult<any>>;
}

const BookFilters: React.FC<BookFiltersProps> = ({ refetchQuery }) => {
  const [genresFilter, setGenresFilter] = useState<string[]>([]);
  const [publishersFilter, setPublishersFilter] = useState<string[]>([]);

  const { data, loading, error } = useQuery(LOAD_GENRES);
  const {
    data: dataP,
    loading: loadingP,
    error: errorP,
  } = useQuery(LOAD_PUBLISHERS);

  const handleFilterClick = () => {
    refetchQuery({
      input: {
        filter: {
          genres: genresFilter,
          publishers: publishersFilter,
        },
      },
    });
  };
  const handleCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    name: string
  ) => {
    const { id, checked } = e.target;

    switch (name) {
      case 'genres':
        if (checked) {
          setGenresFilter([...genresFilter, id]);
        }
        if (!checked) {
          setGenresFilter(genresFilter.filter(e => e !== id));
        }
        break;
      case 'publishers':
        if (checked) {
          setPublishersFilter([...publishersFilter, id]);
        }
        if (!checked) {
          setPublishersFilter(publishersFilter.filter(e => e !== id));
        }
        break;

      default:
        break;
    }
  };

  const showContent = () => {
    return (
      <>
        {data && (
          <Filter
            filterOptions={{ name: 'genres', data: data.genres }}
            handleCheckboxChange={handleCheckboxChange}
          />
        )}
        {dataP && (
          <Filter
            filterOptions={{ name: 'publishers', data: dataP.publishers }}
            handleCheckboxChange={handleCheckboxChange}
          />
        )}
        <div
          className='book_collection__books_filters_button collection_button'
          onClick={e => handleFilterClick()}
        >
          Filter
        </div>
      </>
    );
  };

  return (
    <div className='book_collection__books_filters'>
      {!loading && !loadingP && showContent()}
      {error && <Error text={error.message} />}
      {errorP && <Error text={errorP.message} />}
      {/* do these filters once user log in is implemented */}
      {/* <div className='rating'></div>
      <div className='read'></div>
      <div className='ebook'></div> */}
    </div>
  );
};

export default BookFilters;
