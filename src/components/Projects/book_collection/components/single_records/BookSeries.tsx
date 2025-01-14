import { useTranslation } from 'react-i18next';
import EditButton from '../general-purpose/EditButton';
import List from '../lists/List';

interface BookSeriesProps {
  data: {
    id: string;
    name: string;
    books: [];
  };
  editable: boolean;
}

const BookSeries: React.FC<BookSeriesProps> = ({ data, editable }) => {
  const { t } = useTranslation();
  const { id, name, books } = data;
  const editableData = {
    id,
    name,
    books,
  };
  return (
    <div className='bookSeries'>
      <div className='bookSeries__name'>
        <h4>{name}</h4>
        {editable ? <EditButton data={editableData} /> : null}
      </div>
      {!books.length ? null : (
        <div className='bookSeries__books'>
          <h5>{t('books')}</h5>
          <List data={books} nested={true} />
        </div>
      )}
    </div>
  );
};
export default BookSeries;
