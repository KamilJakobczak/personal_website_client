interface CustomErrorProps {
  text: string;
}

const CustomError: React.FC<CustomErrorProps> = ({ text }) => {
  return (
    <div className='error-message'>
      {/* <label className='error-message_label'>Error:</label> */}
      <span className='error-message_span'>{text}</span>
    </div>
  );
};

export default CustomError;
