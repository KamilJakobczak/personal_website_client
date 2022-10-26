import { useQuery } from '@apollo/client';
import { LOAD_BOOKS } from '../../../GraphQL/queries';

const BookList = () => {
  const { data, loading, error, refetch } = useQuery(LOAD_BOOKS);
  if (loading) return <div>'Loading...'</div>;
  if (error) return <div>`Error! ${error.message}`</div>;

  const listTiles = data.books.map((item: any) => {
    console.log(item);
    return (
      <div key={item.id} className='list__tiles__single_tile'>
        {item.title}
      </div>
    );
  });
  return (
    <div className={`book_collection list`}>
      <div className='list__search_engine'>
        <input type='text' />
      </div>
      <div className='list__tiles'>{listTiles}</div>
    </div>
  );
};

export default BookList;
