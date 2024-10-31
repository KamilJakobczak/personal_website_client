// LIBRARIES
import { useState } from 'react';
import { DocumentNode } from 'graphql';
import { useLocation } from 'react-router-dom';
import { useQuery } from '@apollo/client';
// MAIN COMPONENTS
import Author from './Author';
import Book from './Book';
import Publisher from './Publisher';
// HELPER COMPONENTS
import Error from '../../../../Error';
import DeleteButton from '../general-purpose/DeleteButton';
import LoadingSpinner from '../../../../LoadingSpinner';
import Popup from '../general-purpose/PopUp';
import UserActions from '../user/UserActions';
import UserBookDetails from '../user/UserBookDetails';
// MISC
import { useStatus } from '../../../BookCollection';
import { LOAD_USER_BOOK_DETAILS } from '../../../../../GraphQL/queries';

interface SingleRecordProps {
  query: DocumentNode;
}

const SingleRecord: React.FC<SingleRecordProps> = ({ query }) => {
  const [popupActive, setPopupActive] = useState(false);
  const location = useLocation();
  const { loggedIn } = useStatus();
  const { id } = location.state;
  console.log(popupActive);
  const { loading, error, data, refetch } = useQuery(query, {
    variables: { id },
  });
  const {
    loading: loadingUserBookDetails,
    error: errorUserBookDetails,
    data: dataUserBookDetails,
    refetch: refetchUserBookDetails,
  } = useQuery(LOAD_USER_BOOK_DETAILS, { variables: { bookId: id } });

  if (location.state.refetch) {
    refetch();
    refetchUserBookDetails();
  }

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

  const recordId = () => {
    return (
      (data.author?.id as string) ||
      (data.publisher?.id as string) ||
      (data.book?.id as string)
    );
  };
  return (
    <div className='singleRecord'>
      <div className='singleRecord__container'>
        {data && renderedElement()}
        {data && loggedIn && (
          <DeleteButton
            id={recordId()}
            parentClass='singleRecord__container'
            popupToggle={setPopupActive}
            popupState={popupActive}
          />
        )}
      </div>

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
      {popupActive && <Popup popupToggle={setPopupActive} />}
    </div>
  );
};

export default SingleRecord;
