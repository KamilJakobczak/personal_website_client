import Error from '../../Error';
import LoadingSpinner from '../../LoadingSpinner';
import Author from './Author';
import Book from './Book';
import Publisher from './Publisher';

import { DocumentNode } from 'graphql';
import { useLocation } from 'react-router-dom';
import { useQuery } from '@apollo/client';

interface SingleRecordProps {
  query: DocumentNode;
}

const SingleRecord: React.FC<SingleRecordProps> = ({ query }) => {
  const location = useLocation();
  const { id } = location.state;
  const { loading, error, data } = useQuery(query, {
    variables: { id },
  });

  const renderedElement = () => {
    return (
      (data.author && <Author data={data.author} />) ||
      (data.publisher && <Publisher data={data.publisher} />) ||
      (data.book && <Book data={data.book} />)
    );
  };
  return (
    <>
      <div className='single_record'>{data && renderedElement()}</div>
      {loading && <LoadingSpinner />}
      {error && <Error text={error.message} />}
    </>
  );
};

export default SingleRecord;
