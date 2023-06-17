import { NavLink, useLocation, useNavigate } from 'react-router-dom';

interface NavigationProps {
  elements: {
    id: number;
    path?: string;
    element: string;
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
    return elements.map(({ id, path, element, handler }) => {
      const noSpaceElement = element.replaceAll(' ', '');
      return (
        <li key={id} className='navigation_li'>
          <NavLink
            onClick={() => {
              handleSamePageRefresh(noSpaceElement);
              handler && handler();
            }}
            to={path ? `${path}/${noSpaceElement}` : noSpaceElement}
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
