import { useTranslation } from 'react-i18next';
import EditButton from '../general-purpose/EditButton';
import List from '../lists/List';

interface GenreProps {
  data: {
    id: string;
    name: string;
    namePolish: string;
    books: [];
  };
  editable: boolean;
}

const Genre: React.FC<GenreProps> = ({ data, editable }) => {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const { id, name, namePolish, books } = data;
  const editableData = {
    id,
    name,
    namePolish,
  };
  console.log(currentLanguage);
  return (
    <div className='genre'>
      <div className='genre__name'>
        <h4>{currentLanguage === 'pl' ? (namePolish ? namePolish : name) : name}</h4>
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
