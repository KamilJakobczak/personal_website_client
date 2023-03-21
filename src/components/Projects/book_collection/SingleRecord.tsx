import Error from '../../Error';
import LoadingSpinner from '../../LoadingSpinner';
import Author from './Author';
import Book from './Book';
import Publisher from './Publisher';

import { DocumentNode } from 'graphql';
import { useLocation } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import Button from './Button';

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
    <div className='single-record'>
      <Button text='return' className='single-record__return' goBack={true} />
      <div className='single-record__container'>
        {data && renderedElement()}
      </div>
      {loading && <LoadingSpinner />}
      {error && <Error text={error.message} />}
    </div>
  );
};

export default SingleRecord;
