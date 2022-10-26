import { QueryResult, useQuery } from '@apollo/client';
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { LOAD_BOOKS } from '../GraphQL/queries';

interface ListProps {
  parentClass: string;
}

const List: React.FC<ListProps> = ({ parentClass }) => {
  return <div></div>;
};

export default List;
