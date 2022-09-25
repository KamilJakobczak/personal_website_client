import React, { useEffect, useState } from 'react';
import Scroller from '../scripts/Scroller';
import Header from './Header';
import Main from './Main';
import ScrollerNavigation from './ScrollerNavigation';
import WelcomeMessage from './WelcomeMessage';

const App = () => {
  const elements = [<Header />, <WelcomeMessage />, <Main />];
  const [visibleElementIndex, setVisibleElementIndex] = useState(0);

  useEffect(() => {
    const scroller = new Scroller(elements.length);
    document.addEventListener('wheel', e => {
      scroller.listenScroll(e);
      setVisibleElementIndex(scroller.currentIndex);
    });
    document.addEventListener('keydown', e => {
      scroller.listenKeydown(e);
      setVisibleElementIndex(scroller.currentIndex);
    });
  }, [elements.length]);

  const handleClick = (index: number) => {
    setVisibleElementIndex(index);
  };

  return (
    <div className='scroller'>
      {elements[visibleElementIndex]}
      <ScrollerNavigation
        elements={elements}
        onClick={handleClick}
        visibleElement={visibleElementIndex}
      />
    </div>
  );
};

export default App;
