import { NavLink } from 'react-router-dom';

interface NavigationProps {
  elements: { id: number; element: string }[];
  parentClass: string;
}

const Navigation: React.FC<NavigationProps> = ({ elements, parentClass }) => {
  const renderElements = () => {
    return elements.map(({ id, element }) => {
      return (
        <li key={id} className='navigation_li'>
          <NavLink to={element}>{element}</NavLink>
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
