import EditButton from '../general-purpose/EditButton';
import List from '../lists/List';

interface TranslatorProps {
  data: {
    id: string;
    firstName: string;
    lastName: string;
    books: [];
  };
  editable: boolean;
}

const Translator: React.FC<TranslatorProps> = ({ data, editable }) => {
  const { id, firstName, lastName, books } = data;
  const editableData = {
    id,
    firstName,
    lastName,
  };
  console.log(books);
  return (
    <div className='translator'>
      <div className='translator__name'>
        <h4>
          {firstName} {lastName}
        </h4>
        {editable ? <EditButton data={editableData} /> : null}
      </div>
      {books.length ? (
        <div className='translator__books'>
          <h5>books</h5>
          <List data={books} nested={true} />
        </div>
      ) : null}
    </div>
  );
};
export default Translator;