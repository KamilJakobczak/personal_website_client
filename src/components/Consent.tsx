interface ConsentProps {
  // handleClick: (arg0: boolean) => void;
  handleYesClick: () => void;
  className: string;
  question: string;
}

const Consent: React.FC<ConsentProps> = ({
  // handleClick,
  handleYesClick,
  className,
  question,
}) => {
  return (
    <div className={className}>
      <p>{question}</p>
      <button
        onClick={() => {
          // handleClick(false);
          handleYesClick();
        }}
      >
        yes
      </button>
      <button
        onClick={() => {
          // handleClick(true);
        }}
      >
        no
      </button>
    </div>
  );
};

export default Consent;
