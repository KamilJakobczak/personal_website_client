import { Link, useLocation } from 'react-router-dom';
import AZList from './AZ-list';
import { useState } from 'react';
import { imageApi } from '../../../../../server';
import ThumbnailWithFallback from '../general-purpose/ThumbnailWithFallback';

interface ListProps {
  data: {
    id: string;
    title?: string;
    firstName?: string;
    lastName?: string;
    name?: string;
  }[];
  nested?: boolean;
}
export interface RecordType {
  id: string;
  title?: string;
  firstName?: string;
  lastName?: string;
  name?: string;
  __typename?: string;
}

const List: React.FC<ListProps> = ({ data, nested }) => {
  const [letter, setLetter] = useState('');

  const location = useLocation();

  const linkPath = (record: RecordType) => {
    const pathId = record.id.slice(-10);
    if (!nested) {
      return pathId;
    } else if (nested) {
      if (record.__typename === 'Book') return `../books/${pathId}`;
      if (record.__typename === 'Author') return `../authors/${pathId}`;
      if (record.__typename === 'Publisher') return `../publishers/${pathId}`;
    }
  };

  const sortData = () => {
    return data.filter((record: RecordType) => {
      if (
        record.title?.charAt(0) === letter.toUpperCase() ||
        record.lastName?.charAt(0) === letter.toUpperCase() ||
        record.name?.charAt(0) === letter.toUpperCase()
      ) {
        return record;
      } else return false;
    });
  };

  const checkLocation = () => {
    const path = location.pathname;
    if (path.includes('authors/') || path.includes('/publishers')) return false;
    return true;
  };

  return (
    <>
      {(letter ? sortData() : data).map((record: RecordType) => {
        const thumbnail = `${imageApi}/covers/${record.id}/thumbnail`;
        return (
          <div className='bookCollection__list_element' key={record.id}>
            <ThumbnailWithFallback
              url={thumbnail}
              recordType={record.__typename}
            />
            <Link
              className='router_link'
              to={linkPath(record) || ''}
              state={{ id: record.id }}
            >
              {record.title ? record.title : null}
              {record.lastName
                ? `${record.lastName} ${record.firstName}`
                : null}
              {record.name ? record.name : null}
            </Link>
          </div>
        );
      })}
      {checkLocation() ? <AZList letter={letter} sort={setLetter} /> : null}
    </>
  );
};

export default List;
