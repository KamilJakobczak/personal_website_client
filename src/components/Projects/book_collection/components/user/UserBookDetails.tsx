import { BookStatus, UserBookDetailsType } from '../../types';
import { getOrdinal } from '../../utility/handlers/getOrdinal';

interface UserBookDetailsInterface {
  details: UserBookDetailsType;
  className: string;
}

const UserBookDetails: React.FC<UserBookDetailsInterface> = ({ details, className }) => {
  const { rating, status, whenRead, purchasedBookInfo } = details;

  const statusElement = () => {
    switch (status) {
      case BookStatus.READ:
        if (whenRead) {
          return <p>This book was read by you in {whenRead}</p>;
        } else {
          return <p>This book was read by you in the past</p>;
        }
      case BookStatus.UNREAD:
        return <p>This book is yet to be read.</p>;
      case BookStatus.WANTEDTOBUY:
        return <p>You want to buy this book</p>;
      case BookStatus.WANTEDTOREAD:
        return <p>You want to read this book</p>;
      default:
        return null;
    }
  };
  const ratingElement = () => {
    let stars = [];
    if (rating) {
      for (let i = 0; i < rating; i++) {
        stars.push(<i key={i} className='fa-solid fa-star'></i>);
      }
      return (
        <div className='userBookDetails_rating-wrapper'>
          {stars.map(star => {
            return star;
          })}
        </div>
      );
    }
  };
  const purchasedElement = () => {
    return purchasedBookInfo.map(book => {
      const { edition, coverType } = book;

      if (edition) {
        const { editionNumber, editionYear } = edition;
        const editionOrdinal = getOrdinal(parseInt(editionNumber));

        return (
          <div key={`${coverType}-${editionYear}`}>
            <p>{coverType}</p>
            <div>
              <p>
                {editionNumber &&
                  `${editionNumber}${editionOrdinal} edition ${editionYear ? 'from ' + editionYear : ''}`}
              </p>
            </div>
            <div>
              <p>
                Bought for <span>{`${book.buyPrice} ${book.currency}`}</span>
              </p>
            </div>
          </div>
        );
      }
      return null;
    });
  };
  return (
    <div className={`${className}__userBookDetails userBookDetails`}>
      <h5>Your details</h5>
      <div className={`userBookDetails_rating`}>{ratingElement()}</div>
      <div className={`userBookDetails_status`}>{statusElement()}</div>

      <div className={`userBookDetails_purchased`}>{purchasedElement()}</div>
    </div>
  );
};

export default UserBookDetails;
