import { useQuery } from '@apollo/client';
import { DocumentNode } from 'graphql';
import { useEffect, useState } from 'react';
import Error from '../../../../Error';
import LoadingSpinner from '../../../../LoadingSpinner';
import List from './List';

interface ListProps {
  query: DocumentNode;
  listClass?: string;
}

const CollectionList: React.FC<ListProps> = ({ query, listClass }) => {
  const { data, loading, error } = useQuery(query);
  const [listData, setListData] = useState([]);

  useEffect(() => {
    if (data) {
      if (data.authors) setListData(data.authors);
      if (data.books) setListData(data.books);
      if (data.publishers) setListData(data.publishers);
    }
  }, [data]);

  return (
    <div className={`bookCollection__list ${listClass}`}>
      {loading && <LoadingSpinner />}
      {error && <Error text={error.message} />}
      {data && <List data={listData} />}
    </div>
  );
};
export default CollectionList;
