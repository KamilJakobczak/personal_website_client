import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { LOAD_AUTHORS } from '../../../GraphQL/queries';
import Error from '../../Error';
import LoadingSpinner from '../../LoadingSpinner';

const AuthorList: React.FC = () => {
  const { data, loading, error } = useQuery(LOAD_AUTHORS);
  console.log(loading, error, data);

  const listTiles = () => {
    return data.authors.map((item: any) => {
      return (
        <div key={item.id} className='list__tiles__single_tile'>
          <Link to={item.id.slice(-10, -1)} state={{ authorId: item.id }}>
            {item.name}
          </Link>
        </div>
      );
    });
  };
  return (
    <div className={`book_collection list`}>
      {loading && <LoadingSpinner />}
      {error && <Error text={error.message} />}
      {data && <div className='list__tiles'>{listTiles()}</div>}
    </div>
  );
};

export default AuthorList;
