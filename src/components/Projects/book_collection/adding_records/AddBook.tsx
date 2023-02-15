import { Outlet } from 'react-router-dom';

const AddBook: React.FC = () => {
  return (
    <div className='bookCollection__addBook'>
      <Outlet />
    </div>
  );
};
export default AddBook;
