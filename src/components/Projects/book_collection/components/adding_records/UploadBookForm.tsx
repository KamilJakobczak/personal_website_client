import { useState } from 'react';
import axios from 'axios';
import FileUploader from './FileUploader';
import { ParsedDataInterface } from './UploadBook';
import { uploadAPI } from '../../../../../server';
import Button from '../general-purpose/Button';

interface UploadBookFormProps {
  setParsedData: React.Dispatch<
    React.SetStateAction<ParsedDataInterface | undefined>
  >;
}

const UploadBookForm: React.FC<UploadBookFormProps> = ({ setParsedData }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  const onFileSelectSuccess = (file: File) => {
    setSelectedFile(file);
    setShowDetails(true);
  };

  const fileDetails = () => {
    if (selectedFile) {
      return (
        <div className='bookCollection__addBook__upload_file-details'>
          Name: {selectedFile.name}
          <br />
          Size: {(selectedFile.size / 1024 / 1024).toFixed(2) + 'MB'}
        </div>
      );
    }
  };

  const submitForm = () => {
    const formData = new FormData();
    selectedFile && formData.append('file', selectedFile);
    axios
      .post(`${uploadAPI}`, formData)
      .then(res => {
        setParsedData(res.data);
        alert('file upload success');
      })
      .catch(err => {
        alert('file upload error');
      });
  };
  return (
    <>
      {!showDetails && (
        <p>
          When you upload an epub file it will be sent to my server and all of
          available data will be processed and sent back here for verification.
        </p>
      )}
      <form>
        {showDetails && fileDetails()}
        {selectedFile && (
          <Button
            handleClick={submitForm}
            className='bookCollection__addBook__upload_submit'
            text='submit'
          />
        )}
        <FileUploader
          onFileSelectSuccess={onFileSelectSuccess}
          className='bookCollection__addBook__upload_uploader collection_button'
          text={showDetails ? 'Pick a different file' : null}
        />
      </form>
    </>
  );
};

export default UploadBookForm;
