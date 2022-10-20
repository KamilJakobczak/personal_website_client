import { createBrowserRouter } from 'react-router-dom';
import BookCollection from '../components/Projects/BookCollection';
import App from '../components/App';
import Gallery from '../components/Projects/Gallery';
import Blog from '../components/Projects/Blog';
import CodePlayground from '../components/Projects/CodePlayground';
import ScrollerComponent from '../components/Scroller/Scroller';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <ScrollerComponent />,
  },
  {
    path: '/apps',
    element: <App />,
    children: [
      {
        path: '/apps/collection',
        element: <BookCollection />,
      },
      {
        path: '/apps/coding',
        element: <CodePlayground />,
      },
      {
        path: '/apps/gallery',
        element: <Gallery />,
      },
      {
        path: '/apps/blog',
        element: <Blog />,
      },
    ],
  },
]);
