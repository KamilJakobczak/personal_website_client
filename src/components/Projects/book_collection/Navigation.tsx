import { Link } from 'react-router-dom';
import { useState } from 'react';

interface NavigationProps {
  elements: { id: number; element: string }[];
  parentClass: string;
}

const Navigation: React.FC<NavigationProps> = ({ elements, parentClass }) => {
  const [activeLink, setActiveLink] = useState(Number);

  const handleNavClick = (
    // e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
    id: number
  ) => {
    setActiveLink(id);
  };

  const renderElements = () => {
    return elements.map(({ id, element }) => {
      return (
        <li key={id} className='navigation_li'>
          <Link
            to={element}
            className={activeLink === id ? 'active' : ''}
            onClick={() => handleNavClick(id)}
          >
            {element}
          </Link>
        </li>
      );
    });
  };

  return (
    <nav className={`${parentClass} navigation`}>
      <ul className='navigation_ul'>{renderElements()}</ul>
    </nav>
  );
};

export default Navigation;
