interface ConsentProps {
  handleClick: (arg0: string) => void;
  className: string;
  question: string;
}

const Consent: React.FC<ConsentProps> = ({
  handleClick,
  className,
  question,
}) => {
  return (
    <div className={className}>
      <p>{question}</p>
      <button
        onClick={() => {
          handleClick('yes');
        }}
      >
        yes
      </button>
      <button
        onClick={() => {
          handleClick('no');
        }}
      >
        no
      </button>
    </div>
  );
};

export default Consent;
