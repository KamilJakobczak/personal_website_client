import { Link, Outlet } from 'react-router-dom';

const BookCollection: React.FC = () => {
  return (
    <div className='book_collection'>
      <nav className='book_collection navigation'>
        <ul className='navigation_ul'>
          <li className='navigation_li'>
            <Link to='books'>books</Link>
          </li>
          <li className='navigation_li'>
            <Link to='authors'>authors</Link>
          </li>
          <li className='navigation_li'>
            <Link to='publishers'>publishers</Link>
          </li>
          <li className='navigation_li'>
            <Link to='genres'>genres</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </div>
  );
};

export default BookCollection;
