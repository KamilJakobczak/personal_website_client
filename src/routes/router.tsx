import { createBrowserRouter } from 'react-router-dom';
import BookCollection from '../components/Projects/BookCollection';
import App from '../components/App';
import Gallery from '../components/Projects/Gallery';
import CodeCP from '../components/Projects/CodeCP';
import Blog from '../components/Projects/Blog';
export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/book_collection',
    element: <BookCollection />,
  },
  {
    path: '/gallery',
    element: <Gallery />,
  },
  {
    path: '/jamar_cp',
    element: <CodeCP />,
  },
  {
    path: '/blog',
    element: <Blog />,
  },
]);
