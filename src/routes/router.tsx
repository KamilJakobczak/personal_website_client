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
import AddBookForm from '../components/Projects/book_collection/adding_records/AddBookForm';
import AddPublisherForm from '../components/Projects/book_collection/adding_records/AddPublisherForm';
import NewRecords from '../components/Projects/book_collection/adding_records/NewRecords';
import AddGenreForm from '../components/Projects/book_collection/adding_records/AddGenreForm';
import AddCollection from '../components/Projects/book_collection/adding_records/AddCollection';
import AddTranslator from '../components/Projects/book_collection/adding_records/AddTranslator';
import BookList from '../components/Projects/book_collection/BookList';
import CollectionList from '../components/Projects/book_collection/CollectionList';
import UploadBook from '../components/Projects/book_collection/adding_records/UploadBook';
import AddBook from '../components/Projects/book_collection/adding_records/AddBook';
import AddBookOptions from '../components/Projects/book_collection/adding_records/AddBookOptions';
import AddAuthorForm from '../components/Projects/book_collection/adding_records/AddAuthorForm';
import LogIn from '../components/Projects/book_collection/LogIn';
import SignUp from '../components/Projects/book_collection/SignUp';

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

          {
            path: '/apps/collection/add/genre',
            element: (
              <AddGenreForm
                className='bookCollection__addGenre'
                goBackButton={true}
              />
            ),
          },
          {
            path: '/apps/collection/add/book',
            element: <AddBook />,
            children: [
              {
                path: '/apps/collection/add/book',
                element: <AddBookOptions />,
              },
              {
                path: '/apps/collection/add/book/upload',
                element: <UploadBook />,
              },
              {
                path: '/apps/collection/add/book/manual',
                element: <AddBookForm />,
              },
            ],
          },

          {
            path: '/apps/collection/add/author',
            element: (
              <AddAuthorForm
                className='bookCollection__addAuthor'
                goBackButton={true}
              />
            ),
          },
          {
            path: '/apps/collection/add/publisher',
            element: (
              <AddPublisherForm
                className='bookCollection__addPublisher'
                goBackButton={true}
              />
            ),
          },
          {
            path: '/apps/collection/add/translator',
            element: (
              <AddTranslator
                goBackButton={true}
                className='bookCollection__addTranslator'
              />
            ),
          },
          {
            path: '/apps/collection/add/collection',
            element: (
              <AddCollection
                className='bookCollection__addCollection'
                goBackButton={true}
              />
            ),
          },

          {
            path: '/apps/collection/add',
            element: <NewRecords />,
          },
          {
            path: '/apps/collection/publishers/:id',
            element: <SingleRecord query={LOAD_PUBLISHER} />,
          },
          {
            path: '/apps/collection/user/register',
          },
          {
            path: '/apps/collection/user/login',
            element: <LogIn />,
          },
          {
            path: '/apps/collection/user/signup',
            element: <SignUp />,
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
