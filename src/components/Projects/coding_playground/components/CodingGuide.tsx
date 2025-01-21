import Consent from './Consent';
import { useState, useEffect } from 'react';
import { useActions } from '../hooks/useActions';
import { useTypedSelector } from '../hooks/useTypedSelector';
import LoadingSpinner from '../../../LoadingSpinner';

const CodingGuide: React.FC = () => {
  const [consentVisible, setConsentVisible] = useState('show');
  const [infoVisible, setInfoVisible] = useState(true);
  const [showSessionSuccess, setShowSessionSuccess] = useState(false);

  const { checkSession, createSession, fetchCells } = useActions();
  const { autosave, error, sessionId, loading } = useTypedSelector(state => state.session);

  useEffect(() => {
    if (!autosave) {
      checkSession();
      return;
    }

    if (sessionId && autosave) {
      console.log(sessionId);
      fetchCells(sessionId);
      setShowSessionSuccess(true);
      setTimeout(() => {
        setShowSessionSuccess(false);
      }, 5000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autosave, sessionId, checkSession]);

  const handleConsentClick = (answer: string) => {
    setConsentVisible('hide');

    if (answer === 'yes') {
      if (!sessionId && !autosave) {
        createSession();
      }
    } else if (answer === 'no') {
      setConsentVisible('fold');
    }
  };

  const consentFoldedEl = () => {
    return (
      <div className='coding_info__autosave__fold' onClick={() => setConsentVisible('show')}>
        <p>Click here to edit your settings</p>
      </div>
    );
  };

  const sessionSuccessEl = () => {
    return (
      <div className='coding_info__autosave__success'>
        <p>Session (re)created successfully</p>
      </div>
    );
  };

  const sessionErrorEl = () => {
    return (
      <div className='coding_info__autosave__error'>
        <div className='coding_info__autosave__error__content'>
          <p>{error}</p>
        </div>
        <button onClick={() => handleConsentClick('yes')}>try again</button>
      </div>
    );
  };

  const info = () => {
    return (
      <div className='coding_info__guide'>
        <p>
          Here you can create your own React application. <br />
        </p>
        <p>Some of the features included:</p>
        <ul>
          <li>Two types of cells: code and text</li>
          <li>Importing npm packages is enough to use them. You don't have to install them separately.</li>
          <li>CSS styles</li>
          <li>preview window</li>
          <li>you can create multiple code or text cells</li>
          <li>components created in one cell are usable in others</li>
          <li>move or delete cells at any time</li>
        </ul>
        <button className='coding_info__guide__close_button' onClick={() => setInfoVisible(false)}>
          CLOSE
        </button>
      </div>
    );
  };
  return (
    <div className='coding_info'>
      <h2>Coding playground</h2>
      {infoVisible && info()}
      {consentVisible === 'show' && !sessionId && (
        <Consent
          handleClick={handleConsentClick}
          className='coding_info__autosave'
          question='Do you want to enable cookies and autosave every 120 seconds?'
        />
      )}
      {consentVisible === 'fold' && consentFoldedEl()}
      {loading && <LoadingSpinner />}
      {error && sessionErrorEl()}
      {showSessionSuccess ? sessionSuccessEl() : null}
    </div>
  );
};
export default CodingGuide;
