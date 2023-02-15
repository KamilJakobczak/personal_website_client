import { useRef } from 'react';

interface FileUploaderProps {
  className?: string;
  text?: string | null;
  onFileSelectSuccess: (arg0: File) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({
  onFileSelectSuccess,
  className,
  text,
}) => {
  const fileInput = useRef<HTMLInputElement>(null);
  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.files && onFileSelectSuccess(e.target.files[0]);
  };
  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    fileInput.current && fileInput.current.click();
  };
  return (
    <div className={`file-uploader ${className}`}>
      <input
        style={{ display: 'none' }}
        ref={fileInput}
        type='file'
        onChange={e => handleFileInput(e)}
      />

      <div onClick={e => handleClick(e)}>{text ? text : 'Pick a file'}</div>
    </div>
  );
};

export default FileUploader;
