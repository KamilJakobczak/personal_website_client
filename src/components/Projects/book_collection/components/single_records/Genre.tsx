import { useTranslation } from 'react-i18next';
import EditButton from '../general-purpose/EditButton';
import List from '../lists/List';

interface GenreProps {
  data: {
    id: string;
    name: string;
    books: [];
  };
  editable: boolean;
}

const Genre: React.FC<GenreProps> = ({ data, editable }) => {
  const { t } = useTranslation();
  const { id, name, books } = data;
  const editableData = {
    id,
    name,
  };
  return (
    <div className='genre'>
      <div className='genre__name'>
        <h4>{name}</h4>
        {editable ? <EditButton data={editableData} /> : null}
      </div>
      <div className='genre__data'></div>
      {!books.length ? null : (
        <div className='genre__books'>
          <h5>{t('books')}</h5>
          <List data={books} nested={true} />
        </div>
      )}
    </div>
  );
};
export default Genre;
