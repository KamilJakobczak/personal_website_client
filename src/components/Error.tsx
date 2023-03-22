interface ErrorProps {
  text: string;
}

const Error: React.FC<ErrorProps> = ({ text }) => {
  return (
    <div className='error-message'>
      {/* <label className='error-message_label'>Error:</label> */}
      <span className='error-message_span'>{text}</span>
    </div>
  );
};

export default Error;
