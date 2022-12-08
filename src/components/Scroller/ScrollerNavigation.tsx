import { useEffect, useState } from 'react';

interface ScrollerNavigationProps {
  elements: JSX.Element[];
  onClick(index: number): void;
  visibleElement: number;
}

const ScrollerNavigation: React.FC<ScrollerNavigationProps> = ({
  elements,
  onClick,
  visibleElement,
}) => {
  const [active, setActive] = useState(0);
  useEffect(() => {
    setActive(visibleElement);
  }, [visibleElement]);

  const handleClick = (index: number): void => {
    setActive(index);
    onClick(index);
  };

  return (
    <ul className='scroller__navigation'>
      {elements.map((element: JSX.Element, index: number) => {
        return (
          <li
            className={active === index ? 'active' : ''}
            key={index}
            onClick={e => handleClick(index)}
          ></li>
        );
      })}
    </ul>
  );
};

export default ScrollerNavigation;
