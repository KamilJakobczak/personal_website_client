// LIBRARIES AND HOOKS
import { useEffect, useMemo, useState } from 'react';
import { DocumentNode } from 'graphql';
import { useLocation, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { useStatus } from '../../../BookCollection';
// GRAPHQL QUERIES AND MUTATIONS
import { LOAD_USER_BOOK_DETAILS } from '../../../../../GraphQL/queries';
import { DELETE_RECORD } from '../../../../../GraphQL/mutations';
// MAIN COMPONENTS
import Author from './Author';
import Book from './Book';
import Publisher from './Publisher';
// HELPER COMPONENTS
import CustomError from '../../../../CustomError';
import DeleteButton from '../general-purpose/DeleteButton';
import LoadingSpinner from '../../../../LoadingSpinner';
import Popup from '../general-purpose/PopUp';
import UserActions from '../user/UserActions';
import UserBookDetails from '../user/UserBookDetails';
import SuccessMessage from '../general-purpose/SuccessMessage';
import Genre from './Genre';

type RecordType =
  | 'author'
  | 'book'
  | 'genre'
  | 'publisher'
  // | 'profile'
  // | 'translator'
  // | 'user'
  // | 'bookSeries'
  // | 'customCollection'
  // | 'userBookDetails';
  | undefined;

interface SingleRecordProps {
  query: DocumentNode;
}

const SingleRecord: React.FC<SingleRecordProps> = ({ query }) => {
  const navigate = useNavigate();
  const location = useLocation();
  // State management for errors and popup visibility
  const [userError, setUserError] = useState('');
  const [popupActive, setPopupActive] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  // Get login status and ID from location state
  const { loggedIn } = useStatus();
  const { id, refetch: shouldRefetch } = location?.state;
  // Query to load the main record data
  const { loading, error, data, refetch } = useQuery(query, {
    variables: { id },
  });

  // Query to load user book details
  const {
    loading: loadingUserBookDetails,
    error: errorUserBookDetails,
    data: dataUserBookDetails,
    refetch: refetchUserBookDetails,
  } = useQuery(LOAD_USER_BOOK_DETAILS, { variables: { bookId: id } });

  // Extract user book details if available
  const details = dataUserBookDetails?.userBookDetails.userBookDetails;

  // Mutation for deleting a record
  const [deleteRecord] = useMutation(DELETE_RECORD, {
    onCompleted(data) {
      onCompletedDel();
    },
    onError(err) {
      console.error('Deletion error', err);
      setUserError('An error occured while deleting the record');
    },
  });

  // Effect to refetch data when shouldRefetch is true
  useEffect(() => {
    if (shouldRefetch) {
      refetch();
      refetchUserBookDetails();
    }
  }, [shouldRefetch, refetch, refetchUserBookDetails]);

  // Function to determine record type based on fetched data
  const record = (): RecordType => {
    if (data.author) return 'author';
    if (data.book) return 'book';
    if (data.publisher) return 'publisher';
    if (data.genre) return 'genre';
    return undefined;
  };
  const recordType: RecordType = !loading ? record() : undefined;

  // Memoize the rendered element based on the record type and loading state
  const renderedElement = useMemo(() => {
    switch (recordType) {
      case 'author':
        return <Author data={data.author} editable={loggedIn} />;
      case 'book':
        return <Book data={data.book} editable={loggedIn} />;
      case 'publisher':
        return <Publisher data={data.publisher} editable={loggedIn} />;
      case 'genre':
        return <Genre data={data.genre} editable={loggedIn} />;
      default:
        return undefined;
    }
  }, [recordType, data, loggedIn]);

  // Handle deletion of the record
  const handleDelete = () => {
    try {
      if (!recordType) {
        setUserError('Record type is undefined');
        return;
      }
      deleteRecord({ variables: { model: recordType, id: id } });
    } catch (error: any) {
      console.error('Error:', error.message);
      setUserError('An error occured while trying to delete the record');
    }
  };

  // Logic to handle post-deletion actions and navigation
  const onCompletedDel = () => {
    const linkRedirect = `/apps/collection/${recordType}s`;
    const cappedRecordType = recordType && recordType.charAt(0).toUpperCase() + recordType.slice(1);
    setPopupActive(false);
    setSuccessMessage(`Deletion of ${cappedRecordType} done!`);

    setTimeout(() => {
      setSuccessMessage('');
      navigate(linkRedirect, {
        state: { refetch: true },
      });
    }, 3000);
  };

  // Function to render error messages based on different states
  const showErrors = () => {
    if (error) {
      return <CustomError text={error.message} />;
    }
    if (errorUserBookDetails) {
      return <CustomError text={errorUserBookDetails.message} />;
    }
    if (userError) {
      return <CustomError text={userError} />;
    }
    return null;
  };

  return (
    <div className='singleRecord'>
      <div className='singleRecord__container'>
        {/* Render main content or loading spinner */}
        {loading ? <LoadingSpinner /> : renderedElement}
        {/* Render delete button if logged in */}
        {!loading && loggedIn && (
          <DeleteButton
            id={id}
            parentClass='singleRecord__container'
            popupToggle={setPopupActive}
            popupState={popupActive}
          />
        )}
        {/* Display success message after succesful deletion */}
        {successMessage ? <SuccessMessage item='' successMessage={successMessage} /> : null}
      </div>
      {/* Conditional rendering of user actions and book details */}
      {data?.book && !loading && !loadingUserBookDetails && !details && loggedIn === true && (
        <UserActions parentClass='singleRecord' recordId={id} />
      )}
      {data?.book && !loadingUserBookDetails && details && (
        <UserBookDetails className={'singleRecord'} details={details} />
      )}
      {/* Render any errors that occurred during queries or actions */}
      {showErrors()}
      {/* Render popup for confirmation before deletion */}
      {popupActive && <Popup popupToggle={setPopupActive} handleDelete={handleDelete} />}
    </div>
  );
};

export default SingleRecord;
