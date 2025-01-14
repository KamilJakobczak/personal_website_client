import { NavLink, useLocation, useNavigate } from 'react-router-dom';

interface NavigationProps {
  elements: {
    id: number;
    path?: string;
    element: string;
    text: string;
    handler?: () => void;
  }[];
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
    return elements.map(({ id, path, element, text, handler }) => {
      return (
        <li key={id} className='navigation_li'>
          <NavLink
            onClick={() => {
              handleSamePageRefresh(element);
              handler && handler();
            }}
            to={path ? `${path}/${element}` : element}
          >
            {text}
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
