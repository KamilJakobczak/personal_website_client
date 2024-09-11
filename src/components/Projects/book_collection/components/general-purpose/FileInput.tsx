import React, { useEffect, useRef } from 'react';

interface FileInputProps {
  id: string;
  coverLink?: string;
  fileList: File[];
  onChange: (fileList: FileList) => void;
  parentClass: string;
}

const FileInput: React.FC<FileInputProps> = ({
  id,
  coverLink,
  onChange,
  parentClass,
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
    <>
      <div className={`${parentClass}__fileInput fileInput`}>
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
      </div>
      <div className={`${parentClass}__fileInput_preview`}>
        <img
          src={fileList[0] ? URL.createObjectURL(fileList[0]) : coverLink}
          alt=''
        />
      </div>
    </>
  );
};
export default FileInput;
