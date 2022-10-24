import '@fortawesome/fontawesome-free/css/all.min.css';
import CellList from './coding_playground/components/CellList';
import { useEffect, useState } from 'react';
import { setupBundler } from './coding_playground/bundler';
import CodingGuide from './coding_playground/components/CodingGuide';
import { useActions } from './coding_playground/hooks/useActions';
import { useTypedSelector } from './coding_playground/hooks/useTypedSelector';

const CodePlayground: React.FC = () => {
  useEffect(() => {
    setupBundler();
  }, []);
  const session = useTypedSelector(state => state.session.sessionId);
  console.log(session);
  return (
    <>
      <CodingGuide />
      <CellList />
    </>
  );
};

export default CodePlayground;
