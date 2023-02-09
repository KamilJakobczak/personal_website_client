import { NavLink, useLocation, useNavigate } from 'react-router-dom';

interface NavigationProps {
  elements: { id: number; element: string }[];
  parentClass: string;
}

const Navigation: React.FC<NavigationProps> = ({ elements, parentClass }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleSamePageRefresh = (element: string) => {
    const path = location.pathname.slice(17);
    if (element === path) {
      navigate(0);
    }
  };
  const renderElements = () => {
    return elements.map(({ id, element }) => {
      return (
        <li key={id} className='navigation_li'>
          <NavLink
            onClick={() => {
              handleSamePageRefresh(element);
            }}
            to={element}
          >
            {element}
          </NavLink>
        </li>
      );
    });
  };

  return (
    <nav className={`${parentClass}_navigation navigation`}>
      <ul className='navigation_ul'>{renderElements()}</ul>
    </nav>
  );
};

export default Navigation;
