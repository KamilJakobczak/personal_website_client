import { useQuery } from '@apollo/client';
import { DocumentNode } from 'graphql';
import { Link } from 'react-router-dom';
import Error from '../../Error';
import LoadingSpinner from '../../LoadingSpinner';

interface ListProps {
  query: DocumentNode;
  item: string;
}
interface DataRecord {
  id: string;
  title?: string;
  firstName?: string;
  lastName?: string;
  name?: string;
}
const List: React.FC<ListProps> = ({ query, item }) => {
  const { data, loading, error } = useQuery(query);

  console.log(data);
  const tiles = () => {
    let dataArr: DataRecord[] = [];

    switch (item) {
      case 'authors':
        dataArr = data.authors;
        break;
      case 'books':
        dataArr = data.books;
        break;
      case 'publishers':
        dataArr = data.publishers;
        break;
      case 'genres':
        dataArr = data.genres;
        break;
      default:
        return [];
    }

    const result = dataArr.map(record => {
      return (
        <div className='book_collection__list_element' key={record.id}>
          <Link
            className='router_link'
            to={record.id.slice(-10, -1)}
            state={{ id: record.id }}
          >
            {record.title ? record.title : null}
            {record.lastName ? `${record.lastName} ${record.firstName}` : null}
            {record.name ? record.name : null}
          </Link>
        </div>
      );
    });
    return result;
    // arr.map(() => {});
    // arr.map(() => {});
    // arr.forEach(arr => {
    //   if (arr instanceof Array || arr instanceof Object) {
    //     console.log(typeof arr);
    //     return arr.map(record => {
    //       return (
    //         <div>
    //           <div key={record.id}>
    //             <Link to={record.id.slice(-10, -1)} state={{ id: record.id }}>
    //               {record.title} | {record.name}
    //             </Link>
    //           </div>
    //         </div>
    //       );
    //     });
    //   }
    // });
  };
  return (
    <div className='book_collection__list'>
      {loading && <LoadingSpinner />}
      {error && <Error text={error.message} />}
      {data && tiles()}
    </div>
  );
};
export default List;
