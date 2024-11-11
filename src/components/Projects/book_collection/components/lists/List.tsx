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
    __typename: string;
  }[];
  nested?: boolean;
}
export interface RecordValues {
  id: string;
  title?: string;
  firstName?: string;
  lastName?: string;
  name?: string;
  __typename: string;
}

const List: React.FC<ListProps> = ({ data, nested }) => {
  const [letter, setLetter] = useState('');

  const location = useLocation();
  console.log(data);
  const linkPath = (record: RecordValues) => {
    const pathId = record.id.slice(-10);
    if (!nested) {
      return pathId;
    }
    return `../${record.__typename.toLowerCase()}s/${pathId}`;
  };

  const sortData = () => {
    return data.filter(record => {
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
    if (path.includes('books/')) {
      return true;
    } else {
      return false;
    }
  };

  const showThumbnail = (record: RecordValues, thumbnail: string) => {
    const type = record.__typename;
    if (type === 'Auhor' || type === 'Book' || type === 'Publisher' || type === 'BookSeries') {
      return <ThumbnailWithFallback url={thumbnail} recordType={record.__typename} />;
    }
  };

  return (
    <>
      {(letter ? sortData() : data).map(record => {
        console.log(record);
        const thumbnail = `${imageApi}/covers/${record.id}/thumbnail`;

        return (
          <div className='bookCollection__list_element' key={record.id}>
            <Link className='router_link' to={linkPath(record) || ''} state={{ id: record.id }}>
              {showThumbnail(record, thumbnail)}
              <span>
                {record.title ? record.title : null}
                {record.lastName ? `${record.lastName} ${record.firstName}` : null}
                {record.name ? record.name : null}
              </span>
            </Link>
          </div>
        );
      })}
      {checkLocation() ? <AZList letter={letter} sort={setLetter} /> : null}
    </>
  );
};

export default List;
