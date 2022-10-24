import Consent from '../../../Consent';
import { useState } from 'react';
import { useActions } from '../hooks/useActions';

const CodingGuide: React.FC = () => {
  const [consentVisible, setConsentVisible] = useState('show');
  const [infoVisible, setInfoVisible] = useState(true);
  const { createSession, saveCells } = useActions();

  const handleConsentClick = (answer: string) => {
    setConsentVisible('hide');
    if (answer === 'yes') {
      createSession();
      setInterval(() => {
        saveCells();
      }, 60000);
    } else if (answer === 'no') {
      setConsentVisible('fold');
    }
  };

  const info = () => {
    return (
      <div className='coding_info__guide'>
        <p>
          Here you can create your own React application. <br />
          Some of the features included:
        </p>
        <ul>
          <li>Two types of cells: code and text</li>
          <li>
            Importing npm packages is enough to use them. You don't have to
            install them separately.
          </li>
          <li>CSS styles</li>
          <li>preview window</li>
          <li>you can create multiple code or text cells</li>
          <li>components created in one cell are usable in others</li>
          <li>move or delete cells at any time</li>
        </ul>
        <button
          className='coding_info__guide__close_button'
          onClick={() => setInfoVisible(false)}
        >
          CLOSE
        </button>
      </div>
    );
  };
  return (
    <div className='coding_info'>
      {infoVisible && info()}
      {consentVisible === 'show' && (
        <Consent
          handleClick={handleConsentClick}
          className='coding_info__autosave'
          question='Do you want to enable cookies and autosave every 60 seconds?'
        />
      )}
      {consentVisible === 'fold' && (
        <div
          className='coding_info__autosave__fold'
          onClick={() => setConsentVisible('show')}
        >
          Click here to edit your settings
        </div>
      )}
    </div>
  );
};
export default CodingGuide;
