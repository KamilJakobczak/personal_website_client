import { useState } from 'react';

import AddBookForm from './AddBookForm';
import UploadBookForm from './UploadBookForm';

export interface ParsedDataInterface {
  authors: { existing: string[] | null; new: string[][] | null } | null;
  genres: { existing: string[] | null; new: string[] | null } | null;
  publisher: {
    existing: {
      id: string;
      name: string;
    } | null;
    new: string | null;
  } | null;
  title?: string;
  language?: string;
  cover?: string;
  description?: string;
}
const UploadBook: React.FC = () => {
  const [parsedData, setParsedData] = useState<ParsedDataInterface>();
  const [showAddBookForm, setShowAddBookForm] = useState(false);
  const [newAuthors, setNewAuthors] = useState([]);
  console.log(parsedData);
  return (
    <div className='bookCollection__addBook__upload'>
      {!parsedData && <UploadBookForm setParsedData={setParsedData} />}
      {parsedData?.authors?.new && <div>ADD NEW AUTHORS FIRST</div>}
      {parsedData && showAddBookForm && (
        <AddBookForm uploadedData={parsedData} />
      )}
    </div>
  );
};
export default UploadBook;
