import { useEffect } from 'react';

const useViewportHeight = (elementClass: string) => {
  useEffect(() => {
    const setVH = () => {
      const container = document.querySelector(`.${elementClass}`) as HTMLElement;

      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
      if (container) {
        container.style.height = `calc(var(--vh, 1vh) * 100)`;
      }
    };
    // Initial setting
    setVH();
    // Update on window resize
    window.addEventListener('resize', setVH);

    return () => {
      window.removeEventListener('resize', setVH);
    };
  });
};

export default useViewportHeight;
