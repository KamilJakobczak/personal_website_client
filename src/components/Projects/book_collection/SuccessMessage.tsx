interface SuccessMessageProps {
  item: string;
  successMessage: string;
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({
  item,
  successMessage,
}) => {
  return (
    <div className='success_message'>
      <p>
        {' '}
        {`${item}:`} <span>{successMessage}</span> added succesfully
      </p>
    </div>
  );
};

export default SuccessMessage;
