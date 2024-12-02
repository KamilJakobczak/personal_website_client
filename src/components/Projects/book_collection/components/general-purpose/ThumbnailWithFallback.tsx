import React, { ImgHTMLAttributes, useEffect, useState } from 'react';
import author_thumbnail from '../../../../../images/thumbnails/author_thumbnail.png';
import bookSeries_thumbnail from '../../../../../images/thumbnails/bookSeries_thumbnail.png';
import book_thumbnail from '../../../../../images/thumbnails/book_thumbnail.png';

import genre_thumbnail from '../../../../../images/thumbnails/genre_thumbnail.png';
import publisher_thumbnail from '../../../../../images/thumbnails/publisher_thumbnail.png';
import translator_thumbnail from '../../../../../images/thumbnails/translator_thumbnail.png';

import { RecordTypes } from '../../utility/enums';

interface ThumbnailWithFallbackProps extends ImgHTMLAttributes<any> {
  url?: string;
  recordType: RecordTypes;
  linkTo?: string;
}

const ThumbnailWithFallback: React.FC<ThumbnailWithFallbackProps> = ({ url, recordType }) => {
  const [imgSrc, setImgSrc] = useState('');

  useEffect(() => {
    if (url) {
      switch (recordType) {
        case RecordTypes.Author:
          setImgSrc(author_thumbnail);
          break;
        case RecordTypes.Book:
          const img = new Image();
          img.src = url;
          img.onload = () => setImgSrc(url);
          img.onerror = () => setImgSrc(book_thumbnail);
          break;
        case RecordTypes.Genre:
          setImgSrc(genre_thumbnail);
          break;
        case RecordTypes.Publisher:
          setImgSrc(publisher_thumbnail);
          break;
        case RecordTypes.Translator:
          setImgSrc(translator_thumbnail);
          break;
        case RecordTypes.BookSeries:
          setImgSrc(bookSeries_thumbnail);
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
