import { useQuery } from '@apollo/client';
import {
  LOAD_AUTHORS,
  LOAD_COLLECTIONS,
  LOAD_GENRES,
  LOAD_PUBLISHERS,
  LOAD_TRANSLATORS,
} from '../../../../GraphQL/queries';
import { useEffect, useState } from 'react';

interface useQueriesType {
  authors: [];
  collections: [];
  genres: [];
  publishers: [];
  translators: [];
}

export const useQueries = () => {
  const [data, setData] = useState<useQueriesType>({
    authors: [],
    collections: [],
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
  } = useQuery(LOAD_AUTHORS);
  const {
    error: errorP,
    loading: loadingP,
    data: dataP,
  } = useQuery(LOAD_PUBLISHERS);
  const {
    error: errorG,
    loading: loadingG,
    data: dataG,
  } = useQuery(LOAD_GENRES);
  const {
    error: errorT,
    loading: loadingT,
    data: dataT,
  } = useQuery(LOAD_TRANSLATORS);
  const {
    error: errorC,
    loading: loadingC,
    data: dataC,
  } = useQuery(LOAD_COLLECTIONS);

  useEffect(() => {
    if (loadingA || loadingC || loadingG || loadingP || loadingT) {
      setLoading(true);
    }
  }, [loadingA, loadingC, loadingG, loadingP, loadingT]);

  useEffect(() => {
    if (errorA || errorC || errorG || errorP || errorT) {
      const errA = errorA ? errorA.message : '';
      const errC = errorC ? errorC.message : '';
      const errG = errorG ? errorG.message : '';
      const errP = errorP ? errorP.message : '';
      const errT = errorT ? errorT.message : '';

      const errorString = `Following errors occured: `.concat(
        errA,
        '\n',
        errC,
        '\n',
        errG,
        '\n',
        errP,
        '\n',
        errT
      );

      setErrors(errorString);
    }
  }, [errorA, errorC, errorG, errorP, errorT]);

  useEffect(() => {
    if (dataA && dataC && dataG && dataP && dataT) {
      setData({
        authors: dataA.authors,
        collections: dataC.collections,
        genres: dataG.genres,
        publishers: dataP.publishers,
        translators: dataT.translators,
      });
      setLoading(false);
    }
  }, [dataA, dataC, dataG, dataP, dataT]);

  const payload = {
    data,
    errors,
    loading,
  };

  return payload;
};
