import { useQuery } from '@apollo/client';
import {
  LOAD_AUTHORS,
  LOAD_GENRES,
  LOAD_PUBLISHERS,
  LOAD_TRANSLATORS,
} from '../../../../GraphQL/queries';

export const useQueries = () => {
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
  return { dataA, dataG, dataP, dataT };
};
