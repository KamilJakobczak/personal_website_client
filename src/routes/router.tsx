import { createBrowserRouter } from 'react-router-dom';
import BookCollection from '../components/Projects/BookCollection';
import App from '../components/App';
import Gallery from '../components/Projects/Gallery';
import Blog from '../components/Projects/Blog';
import CodePlayground from '../components/Projects/CodePlayground';
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
    element: <CodePlayground />,
  },
  {
    path: '/blog',
    element: <Blog />,
  },
]);
