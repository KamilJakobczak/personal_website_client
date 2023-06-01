import { createBrowserRouter, redirect } from 'react-router-dom';

import BookCollection, {
  useStatus,
} from '../components/Projects/BookCollection';
import App from '../components/App';

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
import { ProtectedRoute } from './ProtectedRoute';

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
            path: '/apps/collection',
            element: (
              <div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo
                consequatur accusamus, perferendis, nemo magni illum quis
                voluptas sed exercitationem beatae odit temporibus sunt, vel
                eligendi asperiores voluptates deserunt excepturi porro vero!
                Suscipit illum praesentium quidem pariatur obcaecati alias
                ullam, fugit quibusdam! Iste ipsam similique commodi soluta
                possimus voluptates amet quisquam deserunt dolorum molestias
                distinctio, dolor eos consequatur odio! Tenetur fugit dolor in,
                ullam ab temporibus, reiciendis dicta iusto quam quaerat odio?
                Necessitatibus corrupti doloremque sit deserunt. Maxime
                explicabo, et laborum ipsa non vero corrupti voluptatem!
                Perferendis officia sunt incidunt aliquid assumenda saepe
                dolorum sapiente! Repellendus inventore vel ipsam corrupti
                ipsum!
              </div>
            ),
          },
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
            path: '/apps/collection/add/author',
            element: (
              <ProtectedRoute
                nestedElement={
                  <AddAuthorForm
                    className='bookCollection__addAuthor'
                    goBackButton={true}
                  />
                }
              />
            ),
          },
          {
            path: '/apps/collection/add/book',
            element: <ProtectedRoute nestedElement={<AddBook />} />,
            children: [
              {
                path: '/apps/collection/add/book',
                element: <ProtectedRoute nestedElement={<AddBookOptions />} />,
              },
              {
                path: '/apps/collection/add/book/upload',
                element: <ProtectedRoute nestedElement={<UploadBook />} />,
              },
              {
                path: '/apps/collection/add/book/manual',
                element: <ProtectedRoute nestedElement={<AddBookForm />} />,
              },
            ],
          },
          {
            path: '/apps/collection/add/collection',
            element: (
              <ProtectedRoute
                nestedElement={
                  <AddCollection
                    className='bookCollection__addCollection'
                    goBackButton={true}
                  />
                }
              />
            ),
          },
          {
            path: '/apps/collection/add/genre',
            element: (
              <ProtectedRoute
                nestedElement={
                  <AddGenreForm
                    className='bookCollection__addGenre'
                    goBackButton={true}
                  />
                }
              />
            ),
          },
          {
            path: '/apps/collection/add/publisher',
            element: (
              <ProtectedRoute
                nestedElement={
                  <AddPublisherForm
                    className='bookCollection__addPublisher'
                    goBackButton={true}
                  />
                }
              />
            ),
          },
          {
            path: '/apps/collection/add/translator',
            element: (
              <ProtectedRoute
                nestedElement={
                  <AddTranslator
                    goBackButton={true}
                    className='bookCollection__addTranslator'
                  />
                }
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
            path: '/apps/collection/user/login',
            element: <LogIn />,
          },
          {
            path: '/apps/collection/user/logout',
            loader: () => {
              return redirect('/apps/collection');
            },
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
