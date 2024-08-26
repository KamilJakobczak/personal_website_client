import Error from '../../../../Error';
import LoadingSpinner from '../../../../LoadingSpinner';
import Author from './Author';
import Book from './Book';
import Publisher from './Publisher';

import { DocumentNode } from 'graphql';
import { useLocation } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import Button from '../general-purpose/Button';
import UserActions from '../user/UserActions';
import { useStatus } from '../../../BookCollection';
import { LOAD_USER_BOOK_DETAILS } from '../../../../../GraphQL/queries';
import UserBookDetails from '../user/UserBookDetails';

interface SingleRecordProps {
  query: DocumentNode;
}

const SingleRecord: React.FC<SingleRecordProps> = ({ query }) => {
  const location = useLocation();
  const { loggedIn } = useStatus();
  const { id } = location.state;
  const { loading, error, data } = useQuery(query, {
    variables: { id },
  });
  const {
    loading: loadingUserBookDetails,
    error: errorUserBookDetails,
    data: dataUserBookDetails,
  } = useQuery(LOAD_USER_BOOK_DETAILS, { variables: { bookId: id } });

  const details = dataUserBookDetails?.userBookDetails.userBookDetails;

  const renderedElement = () => {
    return (
      (data.author && (
        <Author data={data.author} editable={loggedIn ? true : false} />
      )) ||
      (data.publisher && (
        <Publisher data={data.publisher} editable={loggedIn ? true : false} />
      )) ||
      (data.book && (
        <Book data={data.book} editable={loggedIn ? true : false} />
      ))
    );
  };
  return (
    <div className='singleRecord'>
      {/* <Button text='return' className='single-record__return' goBack={true} /> */}

      <div className='singleRecord__container'>{data && renderedElement()}</div>

      {data &&
        data.book &&
        !loading &&
        !loadingUserBookDetails &&
        !details &&
        loggedIn === true && (
          <UserActions parentClass='singleRecord' recordId={id} />
        )}
      {data && data.book && !loadingUserBookDetails && details && (
        <UserBookDetails className={'singleRecord'} details={details} />
      )}
      {loading && <LoadingSpinner />}
      {error && <Error text={error.message} />}
    </div>
  );
};

export default SingleRecord;
