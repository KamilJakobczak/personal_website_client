import '@fortawesome/fontawesome-free/css/all.min.css';
import CellList from './coding_playground/components/CellList';
import { useEffect } from 'react';
const CodePlayground: React.FC = () => {
  useEffect(() => {
    document.body.classList.add('coding_playground');
  }, []);

  return (
    <div>
      <CellList />
    </div>
  );
};

export default CodePlayground;
