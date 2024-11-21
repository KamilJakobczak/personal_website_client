import { useEffect, useState } from 'react';
import Scroller from '../../scripts/scroller/Scroller';
import Swiper from '../../scripts/scroller/Swiper';
import Business from '../Scroller/Business';
import Home from '../Scroller/Home';
import Projects from '../Scroller/Projects';
import ScrollerNavigation from '../Scroller/ScrollerNavigation';
import WelcomeMessage from '../Scroller/WelcomeMessage';

const ScrollerComponent: React.FC = () => {
  const elements = [<Home />, <WelcomeMessage />, <Projects />, <Business />];
  const [visibleElementIndex, setVisibleElementIndex] = useState(0);
  // useSwiper();
  // useEffect(() => {
  //   document.body.classList.remove('coding_playground');
  // }, []);

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
    <div className='scroller' id='scroller'>
      {elements[visibleElementIndex]}
      <ScrollerNavigation elements={elements} onClick={handleClick} visibleElement={visibleElementIndex} />
    </div>
  );
};
export default ScrollerComponent;
