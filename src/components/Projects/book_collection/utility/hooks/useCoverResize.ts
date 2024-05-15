import { useState, useEffect } from 'react';
import { resizeHelper } from '../handlers/resizeHelper';

export const useCoverResize = () => {
  const [coverSize, setCoverSize] = useState('');

  useEffect(() => {
    resizeHelper(window.innerWidth, setCoverSize);
  }, []);

  useEffect(() => {
    function handleResize() {
      const currentWidth = window.innerWidth;
      resizeHelper(currentWidth, setCoverSize);
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  const payload = {
    coverSize,
  };
  return payload;
};
