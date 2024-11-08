import { useQuery } from '@apollo/client';
import { DocumentNode } from 'graphql';
import { useEffect, useState } from 'react';
import CustomError from '../../../../CustomError';
import LoadingSpinner from '../../../../LoadingSpinner';
import List from './List';
import { useLocation } from 'react-router-dom';

interface ListProps {
  query: DocumentNode;
  listClass?: string;
}

const CollectionList: React.FC<ListProps> = ({ query, listClass }) => {
  const location = useLocation();
  console.log(location.state?.refetch);
  const { data, loading, error } = useQuery(query);
  const [listData, setListData] = useState([]);

  useEffect(() => {
    if (data) {
      if (data.authors) setListData(data.authors);
      if (data.publishers) setListData(data.publishers);
    }
  }, [data]);

  return (
    <div className={`bookCollection__list ${listClass}`}>
      {loading && <LoadingSpinner />}
      {error && <CustomError text={error.message} />}
      {data && <List data={listData} />}
    </div>
  );
};
export default CollectionList;
