import AddPublisher from './AddPublisher';
import { useState } from 'react';
const NewRecords: React.FC = () => {
  const [component, setComponent] = useState('');

  const showButtons = () => {
    return (
      <>
        <div className='new_records__item collection_button'>book</div>
        <div className='new_records__item collection_button'>author</div>
        <div className='new_records__item collection_button'>genre</div>
        <div
          className='new_records__item collection_button'
          onClick={e => setComponent('publisher')}
        >
          publisher
        </div>
        <div className='new_records__item collection_button'>translator</div>
        <div className='new_records__item collection_button'>collection</div>
      </>
    );
  };

  return (
    <div className='new_records'>
      {!component && showButtons()}
      {component === 'publisher' && <AddPublisher />}
    </div>
  );
};
export default NewRecords;
