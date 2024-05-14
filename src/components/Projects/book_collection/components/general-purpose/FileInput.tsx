import React, { useEffect, useRef } from 'react';

interface FileInputProps {
  id: string;
  fileList: File[];
  onChange: (fileList: FileList) => void;
}

const FileInput: React.FC<FileInputProps> = ({
  id,
  onChange,
  fileList = [],
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      const dataTransfer = new DataTransfer();
      fileList.forEach(file => dataTransfer.items.add(file));
      inputRef.current.files = dataTransfer.files;
    }
  }, [fileList]);

  return (
    <div className='fileInput'>
      <input
        className='fileInput_input'
        id={id}
        type='file'
        ref={inputRef}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          if (e.target.files) {
            onChange(e.target.files);
          }
        }}
      />
      <div className='fileInput_preview'>
        <img src={fileList[0] ? URL.createObjectURL(fileList[0]) : ''} alt='' />
      </div>
    </div>
  );
};
export default FileInput;
