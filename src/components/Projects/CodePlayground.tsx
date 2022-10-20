import '@fortawesome/fontawesome-free/css/all.min.css';
import CellList from './coding_playground/components/CellList';
import { useEffect } from 'react';
import { setupBundler } from './coding_playground/bundler';

const CodePlayground: React.FC = () => {
  useEffect(() => {
    setupBundler();
  }, []);

  return <CellList />;
};

export default CodePlayground;
