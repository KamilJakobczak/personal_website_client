import FileUploader from '../FileUploader';
import { useState } from 'react';
import axios from 'axios';
import { uploadAPI } from '../../../../server';
const UploadBook: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  const onFileSelectSuccess = (file: File) => {
    console.log(file);
    setSelectedFile(file);
    setShowDetails(true);
  };

  const submitForm = () => {
    const formData = new FormData();
    selectedFile && formData.append('file', selectedFile);
    axios
      .post(`${uploadAPI}`, formData)
      .then(res => {
        console.log(res);
        alert('file upload success');
      })
      .catch(err => {
        alert('file upload error');
      });
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

  return (
    <div className='bookCollection__addBook__upload'>
      {!showDetails && (
        <p>
          When you upload an epub file it will be sent to my server and all of
          available data will be processed and sent back here for verification.
        </p>
      )}
      <form>
        {showDetails && fileDetails()}
        {selectedFile && (
          <div
            className='bookCollection__addBook__upload_submit collection_button'
            onClick={submitForm}
          >
            Submit
          </div>
        )}
        <FileUploader
          onFileSelectSuccess={onFileSelectSuccess}
          className='bookCollection__addBook__upload_uploader collection_button'
          text={showDetails ? 'Pick a different file' : null}
        />
      </form>
    </div>
  );
};
export default UploadBook;
