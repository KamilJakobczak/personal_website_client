interface AZListProps {
  sort: React.Dispatch<React.SetStateAction<string>>;
}

const AZList: React.FC<AZListProps> = ({ sort }) => {
  const letters = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
  ];

  const handleClick = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    if (e.target instanceof Element) {
      sort(e.target.innerHTML);
    }
  };
  return (
    <div className='bookCollection__list__az'>
      {letters.map(letter => {
        return (
          <span
            className='bookCollection__list__az_element'
            onClick={e => handleClick(e)}
            key={letter}
          >
            {letter}
          </span>
        );
      })}
    </div>
  );
};

export default AZList;
