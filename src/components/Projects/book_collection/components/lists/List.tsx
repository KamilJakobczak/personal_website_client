import { Link } from 'react-router-dom';

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

  return (
    <>
      {data.map(record => {
        return (
          <div className='bookCollection__list_element' key={record.id}>
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
    </>
  );
};

export default List;
