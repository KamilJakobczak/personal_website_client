interface SuccessMessageProps {
  successMessage: string;
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({ successMessage }) => {
  return (
    <div className='success_message'>
      <p>Collection {`${successMessage}`} added succesfully</p>
    </div>
  );
};

export default SuccessMessage;
