import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { DocumentNode } from 'graphql';
import { CollectionsClasses } from '../enums';

interface DataInterface {
  id: string;
  __typename: string;
}

export const usePaginatedQueries = (paginatedQuery: DocumentNode, listCLass?: CollectionsClasses) => {
  const [activePage, setActivePage] = useState(1);
  const [offsetMulti, setOffsetMulti] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [data, setData] = useState<DataInterface[]>([]);
  // const [isMobile, setIsMobile] = useState(0);

  // useEffect(() => {
  //   const handleResize = () => {
  //     const height = window.innerHeight;
  //     const width = window.innerWidth;
  //     console.log(height, width);
  //     if (height <= 600 && width < 1025) {
  //       setIsMobile(0.5);
  //     } else {
  //       setIsMobile(1);
  //     }
  //   };
  //   // Set initial state based on current window size
  //   handleResize();
  //   // window.addEventListener('resize', handleResize);
  //   // return () => {
  //   //   window.removeEventListener('resize', handleResize);
  //   // };
  // }, []);

  useEffect(() => {
    const offset = {
      authors: 30,
      books: 20,
      bookSeries: 20,
      genres: 30,
      publishers: 30,
      translators: 30,
    };
    switch (listCLass) {
      case CollectionsClasses.Authors:
        setOffsetMulti(offset.authors);
        break;
      case CollectionsClasses.Books:
        setOffsetMulti(offset.books);
        break;
      case CollectionsClasses.BookSeries:
        setOffsetMulti(offset.bookSeries);
        break;
      case CollectionsClasses.Genres:
        setOffsetMulti(offset.genres);
        break;
      case CollectionsClasses.Publishers:
        setOffsetMulti(offset.publishers);
        break;
      case CollectionsClasses.Translators:
        setOffsetMulti(offset.translators);
        break;
      default:
        break;
    }
  }, [listCLass]);

  const {
    data: QueryData,
    error,
    loading,
    refetch,
  } = useQuery(paginatedQuery, {
    variables: {
      input: {
        offset: (activePage - 1) * offsetMulti,
        limit: offsetMulti,
      },
    },
    fetchPolicy: 'cache-and-network',
  });

  // console.log(data, loading, error);
  // useEffect(() => {
  //   if (QueryLoading) setLoading(true);
  // }, [QueryLoading]);
  useEffect(() => {
    if (QueryData && !loading) {
      switch (true) {
        case !!QueryData.booksFeed:
          const { books } = QueryData.booksFeed;
          setData(books);
          setTotalPages(Math.ceil(QueryData.booksFeed.totalCount / offsetMulti));
          break;
        case !!QueryData.authorsFeed:
          const { authors } = QueryData.authorsFeed;
          setData(authors);
          setTotalPages(Math.ceil(QueryData.authorsFeed.totalCount / offsetMulti));
          break;
        case !!QueryData.publishersFeed:
          const { publishers } = QueryData.publishersFeed;
          setData(publishers);
          setTotalPages(Math.ceil(QueryData.publishersFeed.totalCount / offsetMulti));
          break;
        case !!QueryData.bookSeriesFeed:
          const { bookSeries } = QueryData.bookSeriesFeed;
          setData(bookSeries);
          setTotalPages(Math.ceil(QueryData.bookSeriesFeed.totalCount / offsetMulti));
          break;
        case !!QueryData.genresFeed:
          const { genres } = QueryData.genresFeed;
          setData(genres);
          setTotalPages(Math.ceil(QueryData.genresFeed.totalCount / offsetMulti));
          break;
        case !!QueryData.translatorsFeed:
          const { translators } = QueryData.translatorsFeed;
          setData(translators);
          setTotalPages(Math.ceil(QueryData.translatorsFeed.totalCount / offsetMulti));
          break;
        default:
          break;
      }
    }
  }, [QueryData, loading, offsetMulti]);

  const payload = {
    data,
    error,
    loading,
    refetch,
    pagination: { activePage, totalPages, setActivePage },
  };
  return payload;
};
