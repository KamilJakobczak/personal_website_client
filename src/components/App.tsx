import React, { useEffect, useState } from 'react';
import Scroller from '../scripts/scroller/Scroller';
import Swiper from '../scripts/scroller/Swiper';
import Business from './Business';
import Header from './Header';
import Projects from './Projects';
import ScrollerNavigation from './ScrollerNavigation';
import WelcomeMessage from './WelcomeMessage';

const App = () => {
  const elements = [<Header />, <WelcomeMessage />, <Projects />, <Business />];
  const [visibleElementIndex, setVisibleElementIndex] = useState(0);

  useEffect(() => {
    const scroller = new Scroller(elements.length);
    new Swiper();

    document.addEventListener('wheel', e => {
      scroller.listenScroll(e);
      setVisibleElementIndex(scroller.currentIndex);
    });
    document.addEventListener('keydown', e => {
      scroller.listenKeydown(e);
      setVisibleElementIndex(scroller.currentIndex);
    });
    document.addEventListener('swipeUp', () => {
      scroller.scroll(1);
      setVisibleElementIndex(scroller.currentIndex);
    });
    document.addEventListener('swipeDown', () => {
      scroller.scroll(-1);
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
