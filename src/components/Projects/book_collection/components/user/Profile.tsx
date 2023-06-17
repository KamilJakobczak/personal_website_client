import { useQuery } from '@apollo/client';
import { LOAD_PROFILE } from '../../../../../GraphQL/queries';
import Navigation from '../general-purpose/Navigation';
import { Outlet } from 'react-router-dom';

const Profile: React.FC = () => {
  const { error, loading, data } = useQuery(LOAD_PROFILE);
  console.log(data);
  const navElements = [
    { id: 0, path: '', element: 'library' },
    { id: 1, path: '', element: 'lists' },
  ];
  return (
    <div className='bookCollection__my__profile'>
      <div className='bookCollection__my__profile_bio'>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Expedita,
        porro. Nulla beatae ducimus eveniet doloremque repellendus saepe, ut
        possimus, quisquam distinctio porro dignissimos asperiores consequuntur
        sunt neque esse et? Sunt.
      </div>
      <Navigation
        parentClass='bookCollection__my__profile'
        elements={navElements}
      />
      <Outlet />
    </div>
  );
};

export default Profile;
