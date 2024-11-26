import { createBrowserRouter, redirect } from 'react-router-dom';
import BookCollection from '../components/Projects/BookCollection';
import App from '../components/App';
import CodePlayground from '../components/Projects/CodePlayground';
import ScrollerComponent from '../components/Scroller/Scroller';
import { apollo_client } from '../ApolloClient';
import { ApolloProvider } from '@apollo/client';

import {
  LOAD_AUTHOR,
  LOAD_AUTHORS_FEED,
  LOAD_BOOK,
  LOAD_BOOKSERIES_FEED,
  LOAD_GENRE,
  LOAD_GENRES_FEED,
  LOAD_PUBLISHER,
  LOAD_PUBLISHERS_FEED,
  LOAD_SINGLEBOOKSERIES,
  LOAD_TRANSLATOR,
  LOAD_TRANSLATORS_FEED,
} from '../GraphQL/queries';

import SingleRecord from '../components/Projects/book_collection/components/single_records/SingleRecord';
import AddBookForm from '../components/Projects/book_collection/components/adding_records/AddBookForm';
import AddPublisherForm from '../components/Projects/book_collection/components/adding_records/AddPublisherForm';
import NewRecords from '../components/Projects/book_collection/components/adding_records/NewRecords';
import AddGenreForm from '../components/Projects/book_collection/components/adding_records/AddGenreForm';
import AddTranslatorForm from '../components/Projects/book_collection/components/adding_records/AddTranslatorForm';
import BookList from '../components/Projects/book_collection/components/lists/BookList';
import CollectionList from '../components/Projects/book_collection/components/lists/CollectionList';
import UploadBook from '../components/Projects/book_collection/components/adding_records/UploadBook';
import AddBook from '../components/Projects/book_collection/components/adding_records/AddBook';
import AddBookOptions from '../components/Projects/book_collection/components/adding_records/AddBookOptions';
import AddAuthorForm from '../components/Projects/book_collection/components/adding_records/AddAuthorForm';
import LogIn from '../components/Projects/book_collection/components/user/LogIn';
import SignUp from '../components/Projects/book_collection/components/user/SignUp';
import { ProtectedRoute } from './ProtectedRoute';
import UserLibrary from '../components/Projects/book_collection/components/user/UserLibrary';
import Profile from '../components/Projects/book_collection/components/user/Profile';
import AddBookSeries from '../components/Projects/book_collection/components/adding_records/AddBookSeries';
import { CollectionsClasses, Flags } from '../components/Projects/book_collection/utility/enums';

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
              <div className='bookCollection__welcome'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo consequatur accusamus, perferendis, nemo
                magni illum quis voluptas sed exercitationem beatae odit temporibus sunt, vel eligendi asperiores
                voluptates deserunt excepturi porro vero! Suscipit illum praesentium quidem pariatur obcaecati alias
                ullam, fugit quibusdam! Iste ipsam similique commodi soluta possimus voluptates amet quisquam deserunt
                dolorum molestias distinctio, dolor eos consequatur odio! Tenetur fugit dolor in, ullam ab temporibus,
                reiciendis dicta iusto quam quaerat odio? Necessitatibus corrupti doloremque sit deserunt. Maxime
                explicabo, et laborum ipsa non vero corrupti voluptatem! Perferendis officia sunt incidunt aliquid
                assumenda saepe dolorum sapiente! Repellendus inventore vel ipsam corrupti ipsum!
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
            // children: [

            // ],
          },
          {
            path: '/apps/collection/books/:id/edit',
            element: <ProtectedRoute nestedElement={<AddBookForm flag={Flags.Edit} />} />,
          },
          {
            path: '/apps/collection/authors',
            element: <CollectionList paginatedQuery={LOAD_AUTHORS_FEED} listClass={CollectionsClasses.Authors} />,
          },

          {
            path: '/apps/collection/authors/:id',
            element: <SingleRecord query={LOAD_AUTHOR} />,
          },
          {
            path: '/apps/collection/authors/:id/edit',
            element: (
              <ProtectedRoute
                nestedElement={<AddAuthorForm className='bookCollection__editAuthor' flag={Flags.Edit} />}
              />
            ),
          },
          {
            path: '/apps/collection/bookseries',
            element: <CollectionList paginatedQuery={LOAD_BOOKSERIES_FEED} listClass={CollectionsClasses.BookSeries} />,
          },
          {
            path: '/apps/collection/bookseries/:id',
            element: <SingleRecord query={LOAD_SINGLEBOOKSERIES} />,
          },
          {
            path: '/apps/collection/bookseries/:id/edit',
            element: (
              <ProtectedRoute
                nestedElement={<AddBookSeries className='bookCollection__editGenre' flag={Flags.Edit} />}
              />
            ),
          },
          {
            path: '/apps/collection/genres',
            element: <CollectionList paginatedQuery={LOAD_GENRES_FEED} listClass={CollectionsClasses.Genres} />,
          },
          {
            path: '/apps/collection/genres/:id',
            element: <SingleRecord query={LOAD_GENRE} />,
          },
          {
            path: '/apps/collection/genres/:id/edit',
            element: (
              <ProtectedRoute
                nestedElement={<AddGenreForm className='bookCollection__editGenre' flag={Flags.Edit} />}
              />
            ),
          },

          {
            path: '/apps/collection/publishers',
            element: <CollectionList paginatedQuery={LOAD_PUBLISHERS_FEED} listClass={CollectionsClasses.Publishers} />,
          },
          {
            path: '/apps/collection/add/author',
            element: (
              <ProtectedRoute
                nestedElement={<AddAuthorForm className='bookCollection__addAuthor' flag={Flags.Add} />}
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
                element: <ProtectedRoute nestedElement={<AddBookForm flag={Flags.Add} />} />,
              },
            ],
          },
          {
            path: '/apps/collection/add/bookseries',
            element: (
              <ProtectedRoute
                nestedElement={<AddBookSeries className='bookCollection__addBookSeries' flag={Flags.Add} />}
              />
            ),
          },
          {
            path: '/apps/collection/add/genre',
            element: (
              <ProtectedRoute nestedElement={<AddGenreForm className='bookCollection__addGenre' flag={Flags.Add} />} />
            ),
          },
          {
            path: '/apps/collection/add/publisher',
            element: (
              <ProtectedRoute
                nestedElement={<AddPublisherForm className='bookCollection__addPublisher' flag={Flags.Add} />}
              />
            ),
          },
          {
            path: '/apps/collection/add/translator',
            element: (
              <ProtectedRoute
                nestedElement={<AddTranslatorForm className='bookCollection__addTranslator' flag={Flags.Add} />}
              />
            ),
          },

          {
            path: '/apps/collection/add',
            element: <ProtectedRoute nestedElement={<NewRecords />} />,
          },
          {
            path: '/apps/collection/publishers/:id',
            element: <SingleRecord query={LOAD_PUBLISHER} />,
          },
          {
            path: '/apps/collection/publishers/:id/edit',
            element: (
              <ProtectedRoute
                nestedElement={<AddPublisherForm className='bookCollection__editPublisher' flag={Flags.Edit} />}
              />
            ),
          },
          {
            path: '/apps/collection/translators',
            element: (
              <CollectionList paginatedQuery={LOAD_TRANSLATORS_FEED} listClass={CollectionsClasses.Translators} />
            ),
          },
          {
            path: '/apps/collection/translators/:id',
            element: <SingleRecord query={LOAD_TRANSLATOR} />,
          },
          {
            path: '/apps/collection/translators/:id/edit',
            element: (
              <ProtectedRoute
                nestedElement={<AddTranslatorForm className='bookCollection__editTranslator' flag={Flags.Edit} />}
              />
            ),
          },
          {
            path: '/apps/collection/user/profile',
            element: <Profile />,
            children: [
              {
                path: '/apps/collection/user/profile/library',
                element: <UserLibrary />,
              },
            ],
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
