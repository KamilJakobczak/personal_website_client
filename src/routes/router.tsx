import { createBrowserRouter } from 'react-router-dom';

import BookCollection from '../components/Projects/BookCollection';
import App from '../components/App';
import Gallery from '../components/Projects/Gallery';
import Blog from '../components/Projects/Blog';
import CodePlayground from '../components/Projects/CodePlayground';
import ScrollerComponent from '../components/Scroller/Scroller';
import { apollo_client } from '../ApolloClient';
import { ApolloProvider } from '@apollo/client';

import List from '../components/Projects/book_collection/List';
import {
  LOAD_AUTHOR,
  LOAD_AUTHORS,
  LOAD_BOOK,
  LOAD_BOOKS,
  LOAD_PUBLISHER,
  LOAD_PUBLISHERS,
} from '../GraphQL/queries';
import BookFilter from '../components/Projects/book_collection/BookFilter';

import SingleRecord from '../components/Projects/book_collection/SingleRecord';

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
            element: (
              <div>
                <BookFilter
                  filterOptions={[
                    {
                      name: 'genre',
                      values: ['fantasy', 'sci-fi', 'history'],
                    },
                  ]}
                />
                <List query={LOAD_BOOKS} item={'books'} />
              </div>
            ),
          },
          {
            path: '/apps/collection/books/:id',
            element: <SingleRecord query={LOAD_BOOK} />,
          },
          {
            path: '/apps/collection/authors',
            element: <List query={LOAD_AUTHORS} item={'authors'} />,
          },
          {
            path: '/apps/collection/authors/:id',
            element: <SingleRecord query={LOAD_AUTHOR} />,
          },
          {
            path: '/apps/collection/publishers',
            element: <List query={LOAD_PUBLISHERS} item={'publishers'} />,
          },
          {
            path: '/apps/collection/publishers/:id',
            element: <SingleRecord query={LOAD_PUBLISHER} />,
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
