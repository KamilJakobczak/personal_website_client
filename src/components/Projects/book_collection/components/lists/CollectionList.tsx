import { DocumentNode } from 'graphql';
import { useEffect } from 'react';
import CustomError from '../../../../CustomError';
import LoadingSpinner from '../../../../LoadingSpinner';
import List from './List';
import { useLocation } from 'react-router-dom';
import { usePaginatedQueries } from '../../utility/hooks/usePaginatedQueries';
import { CollectionsClasses } from '../../utility/enums';
import { useTranslation } from 'react-i18next';

export interface ListProps {
  paginatedQuery: DocumentNode;
  listClass?: CollectionsClasses;
}

const CollectionList: React.FC<ListProps> = ({ paginatedQuery, listClass }) => {
  const { t } = useTranslation();
  const location = useLocation();
  const refetchBoolean = location.state?.refetch;

  const displayH4 = () => {
    switch (listClass) {
      case CollectionsClasses.Authors:
        return t('authors');
      case CollectionsClasses.Books:
        return t('books');
      case CollectionsClasses.BookSeries:
        return t('bookSeries');
      case CollectionsClasses.Genres:
        return t('genres');
      case CollectionsClasses.Publishers:
        return t('publishers');
      case CollectionsClasses.Translators:
        return t('translators');
      default:
        break;
    }
  };

  const { data, loading, error, refetch, pagination } = usePaginatedQueries(paginatedQuery, listClass);
  // Effect to handle refetching and updating list data
  useEffect(() => {
    if (refetchBoolean) {
      refetch();
    }
  }, [refetch, refetchBoolean]);

  const showList = () => {
    if (loading) {
      return <LoadingSpinner />;
    } else {
      return (
        <>
          <h4>{displayH4()}</h4>
          {error && <CustomError text={error.message} />}
          {!error && data && <List data={data} pagination={pagination} />}
        </>
      );
    }
  };

  return <div className={`bookCollection__list ${listClass}`}>{showList()}</div>;
};
export default CollectionList;
