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

  useEffect(() => {
    console.log(listCLass);
    switch (listCLass) {
      case CollectionsClasses.Authors:
        setOffsetMulti(16);
        break;
      case CollectionsClasses.Books:
        setOffsetMulti(10);
        break;
      case CollectionsClasses.BookSeries:
        setOffsetMulti(20);
        break;
      case CollectionsClasses.Genres:
        setOffsetMulti(20);
        break;
      case CollectionsClasses.Publishers:
        setOffsetMulti(12);
        break;
      case CollectionsClasses.Translators:
        setOffsetMulti(16);
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
