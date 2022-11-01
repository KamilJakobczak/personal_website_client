import { useLocation } from 'react-router-dom';
import { useLocations } from './Projects/coding_playground/hooks/useLocations';

const Location: React.FC = () => {
  const location = useLocation();
  const locationString = useLocations(location.pathname);

  const showLocation = () => {
    switch (locationString) {
      case 'collection':
        return 'book collection';
      case 'coding':
        return 'coding playground';

      default:
        break;
    }
  };
  return (
    <div className='location'>
      <span className='location__text'>{showLocation()}</span>
    </div>
  );
};

export default Location;
