import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { LOAD_GENRES, LOAD_PUBLISHERS } from '../../../GraphQL/queries';
import Filter from './Filter';

interface BookFiltersProps {}

const BookFilters: React.FC<BookFiltersProps> = ({}) => {
  const { data, loading, error } = useQuery(LOAD_GENRES);
  const {
    data: dataP,
    loading: loadingP,
    error: errorP,
  } = useQuery(LOAD_PUBLISHERS);

  const [genresFilter, setGenresFilter] = useState(['']);
  const [publishersFilter, setPublishersFilter] = useState(['']);

  const handleCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    name: string
  ) => {
    console.log(e);
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

  return (
    <div className='book_collection__books_filters'>
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
      {/* do these filters once user log in is implemented */}
      {/* <div className='rating'></div>
      <div className='read'></div>
      <div className='ebook'></div> */}
    </div>
  );
};

export default BookFilters;
