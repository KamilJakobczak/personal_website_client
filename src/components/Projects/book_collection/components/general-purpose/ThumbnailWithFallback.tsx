import React, { ImgHTMLAttributes, useEffect, useState } from 'react';
import author_thumbnail from '../../../../../images/thumbnails/author_thumbnail.png';
import book_thumbnail from '../../../../../images/thumbnails/book_thumbnail.png';
import publisher_thumbnail from '../../../../../images/thumbnails/publisher_thumbnail.png';

interface ThumbnailWithFallbackProps extends ImgHTMLAttributes<any> {
  url?: string;
  recordType: string;
  linkTo?: string;
}

const ThumbnailWithFallback: React.FC<ThumbnailWithFallbackProps> = ({ url, recordType }) => {
  const [imgSrc, setImgSrc] = useState('');

  useEffect(() => {
    if (url && recordType === 'Book') {
      const img = new Image();
      img.src = url;
      img.onload = () => setImgSrc(url);
      img.onerror = () => {
        if (recordType === 'Book') {
          setImgSrc(book_thumbnail);
        }
      };
    } else if (recordType === 'Author' || recordType === 'Publisher') {
      switch (recordType) {
        case 'Author':
          setImgSrc(author_thumbnail);
          break;
        case 'Publisher':
          setImgSrc(publisher_thumbnail);
          break;
        default:
          break;
      }
    }
  }, [url, recordType]);

  const showImage = () => {
    return (
      <div className='bookCollection__list_element_thumbnail'>
        <img src={imgSrc} alt='thumbnail' />
      </div>
    );
  };

  return showImage();
};
export default ThumbnailWithFallback;
