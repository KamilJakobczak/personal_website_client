import Consent from '../../../Consent';
import { useState } from 'react';
import { useActions } from '../hooks/useActions';

// interface CodingGuideProps {
//   handleInfoClick: () => void;
// }

const CodingGuide: React.FC = () => {
  const [consentVisible, setConsentVisible] = useState(true);
  const [infoVisible, setInfoVisible] = useState(true);
  const [consent, setConsent] = useState(false);
  // const { autosaveCells } = useActions;

  const handleConsentYesClick = () => {
    // if (consent) {
    //   autosaveCells()
    // }
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
      {consentVisible && (
        <Consent
          // handleClick={setConsentVisible}
          handleYesClick={handleConsentYesClick}
          className='coding_info__autosave'
          question='Do you want to enable cookies and autosave every 60 seconds?'
        />
      )}
    </div>
  );
};
export default CodingGuide;
