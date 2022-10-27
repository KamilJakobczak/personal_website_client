interface ErrorProps {
  text: string;
}

const Error: React.FC<ErrorProps> = ({ text }) => {
  return (
    <div className='error_message'>
      Error: <span>{text}</span>
    </div>
  );
};

export default Error;
