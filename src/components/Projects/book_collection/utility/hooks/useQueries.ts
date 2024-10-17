import { useQuery } from '@apollo/client';
import {
  LOAD_AUTHORS,
  LOAD_BOOKSERIES,
  LOAD_GENRES,
  LOAD_PUBLISHERS,
  LOAD_TRANSLATORS,
} from '../../../../../GraphQL/queries';
import { useEffect, useState } from 'react';

interface useQueriesType {
  authors: [];
  bookSeries: [];
  genres: [];
  publishers: [];
  translators: [];
}

export const useQueries = () => {
  const [data, setData] = useState<useQueriesType>({
    authors: [],
    bookSeries: [],
    genres: [],
    publishers: [],
    translators: [],
  });
  const [errors, setErrors] = useState('');
  const [loading, setLoading] = useState(false);
  const {
    error: errorA,
    loading: loadingA,
    data: dataA,
    refetch: refetchA,
  } = useQuery(LOAD_AUTHORS);
  const {
    error: errorP,
    loading: loadingP,
    data: dataP,
    refetch: refetchP,
  } = useQuery(LOAD_PUBLISHERS);
  const {
    error: errorG,
    loading: loadingG,
    data: dataG,
    refetch: refetchG,
  } = useQuery(LOAD_GENRES);
  const {
    error: errorT,
    loading: loadingT,
    data: dataT,
    refetch: refetchT,
  } = useQuery(LOAD_TRANSLATORS);
  const {
    error: errorBS,
    loading: loadingBS,
    data: dataBS,
    refetch: refetchBS,
  } = useQuery(LOAD_BOOKSERIES);

  useEffect(() => {
    if (loadingA || loadingBS || loadingG || loadingP || loadingT) {
      setLoading(true);
    }
  }, [loadingA, loadingBS, loadingG, loadingP, loadingT]);

  useEffect(() => {
    if (errorA || errorBS || errorG || errorP || errorT) {
      const errA = errorA ? errorA.message : '';
      const errBS = errorBS ? errorBS.message : '';
      const errG = errorG ? errorG.message : '';
      const errP = errorP ? errorP.message : '';
      const errT = errorT ? errorT.message : '';

      const errorString = `Following errors occured: `.concat(
        errA,
        '\n',
        errBS,
        '\n',
        errG,
        '\n',
        errP,
        '\n',
        errT
      );

      setErrors(errorString);
    }
  }, [errorA, errorBS, errorG, errorP, errorT]);

  useEffect(() => {
    if (dataA && dataBS && dataG && dataP && dataT) {
      setData({
        authors: dataA.authors,
        bookSeries: dataBS.bookSeries,
        genres: dataG.genres,
        publishers: dataP.publishers,
        translators: dataT.translators,
      });
      setLoading(false);
    }
  }, [dataA, dataBS, dataG, dataP, dataT]);

  const refetch = () => {
    setLoading(true);
    setData({
      authors: [],
      bookSeries: [],
      genres: [],
      publishers: [],
      translators: [],
    });
    refetchA();
    refetchBS();
    refetchG();
    refetchP();
    refetchT();
    if (data) {
      setLoading(false);
    }
  };

  const payload = {
    data,
    errors,
    loading,
    refetch,
  };

  return payload;
};
