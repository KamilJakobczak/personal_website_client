import { createBrowserRouter } from 'react-router-dom';
import Book from '../components/Projects/book_collection/Book';
import BookCollection from '../components/Projects/BookCollection';
import App from '../components/App';
import Gallery from '../components/Projects/Gallery';
import Blog from '../components/Projects/Blog';
import CodePlayground from '../components/Projects/CodePlayground';
import ScrollerComponent from '../components/Scroller/Scroller';
import { apollo_client } from '../ApolloClient';
import { ApolloProvider } from '@apollo/client';

import List from '../components/Projects/book_collection/LIst';
import {
  LOAD_AUTHORS,
  LOAD_BOOKS,
  LOAD_GENRES,
  LOAD_PUBLISHERS,
} from '../GraphQL/queries';

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
        element: (
          <ApolloProvider client={apollo_client}>
            <BookCollection />
          </ApolloProvider>
        ),
        children: [
          {
            path: '/apps/collection/books',
            element: <List query={LOAD_BOOKS} item={'books'} />,
          },
          { path: '/apps/collection/books/:id', element: <Book /> },
          {
            path: '/apps/collection/authors',
            element: <List query={LOAD_AUTHORS} item={'authors'} />,
          },
          {
            path: '/apps/collection/publishers',
            element: <List query={LOAD_PUBLISHERS} item={'publishers'} />,
          },
          {
            path: '/apps/collection/genres',
            element: <List query={LOAD_GENRES} item={'genres'} />,
          },
        ],
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
