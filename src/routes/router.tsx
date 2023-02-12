import { createBrowserRouter } from 'react-router-dom';

import BookCollection from '../components/Projects/BookCollection';
import App from '../components/App';
import Gallery from '../components/Projects/Gallery';
import Blog from '../components/Projects/Blog';
import CodePlayground from '../components/Projects/CodePlayground';
import ScrollerComponent from '../components/Scroller/Scroller';
import { apollo_client } from '../ApolloClient';
import { ApolloProvider } from '@apollo/client';

import {
  LOAD_AUTHOR,
  LOAD_AUTHORS,
  LOAD_BOOK,
  LOAD_PUBLISHER,
  LOAD_PUBLISHERS,
} from '../GraphQL/queries';

import SingleRecord from '../components/Projects/book_collection/SingleRecord';
import AddBook from '../components/Projects/book_collection/adding_records/AddBook';
import AddPublisher from '../components/Projects/book_collection/adding_records/AddPublisher';
import NewRecords from '../components/Projects/book_collection/adding_records/NewRecords';
import AddGenre from '../components/Projects/book_collection/adding_records/AddGenre';
import AddCollection from '../components/Projects/book_collection/adding_records/AddCollection';
import AddTranslator from '../components/Projects/book_collection/adding_records/AddTranslator';
import AddAuthor from '../components/Projects/book_collection/adding_records/AddAuthor';
import BookList from '../components/Projects/book_collection/BookList';
import CollectionList from '../components/Projects/book_collection/CollectionList';

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
            element: <BookList />,
          },
          {
            path: '/apps/collection/books/:id',
            element: <SingleRecord query={LOAD_BOOK} />,
          },
          {
            path: '/apps/collection/authors',
            element: <CollectionList query={LOAD_AUTHORS} />,
          },

          {
            path: '/apps/collection/authors/:id',
            element: <SingleRecord query={LOAD_AUTHOR} />,
          },
          {
            path: '/apps/collection/publishers',
            element: <CollectionList query={LOAD_PUBLISHERS} />,
          },

          { path: '/apps/collection/add/genre', element: <AddGenre /> },
          { path: '/apps/collection/add/book/manual', element: <AddBook /> },
          { path: '/apps/collection/add/author', element: <AddAuthor /> },
          { path: '/apps/collection/add/publisher', element: <AddPublisher /> },
          {
            path: '/apps/collection/add/translator',
            element: <AddTranslator />,
          },
          {
            path: '/apps/collection/add/collection',
            element: <AddCollection />,
          },

          {
            path: '/apps/collection/add',
            element: <NewRecords />,
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
      // {
      //   path: '/apps/gallery',
      //   element: <Gallery />,
      // },
      // {
      //   path: '/apps/blog',
      //   element: <Blog />,
      // },
    ],
  },
]);
