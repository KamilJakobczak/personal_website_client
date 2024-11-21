import { useQuery } from '@apollo/client';
import { CHECK_LOGIN } from '../GraphQL/queries';
import LoadingSpinner from '../components/LoadingSpinner';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  nestedElement: any;
}

export const ProtectedRoute = (props: ProtectedRouteProps) => {
  const { error, loading, data } = useQuery(CHECK_LOGIN);
  const { nestedElement } = props;
  if (data && data.checkLogin.authenticated) {
    return nestedElement;
  } else if (loading && !data) return <LoadingSpinner />;
  else if (!loading && !data) return <Navigate to='/apps/collection' />;
};
