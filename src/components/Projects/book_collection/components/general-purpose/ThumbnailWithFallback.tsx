import React, { ImgHTMLAttributes, useMemo, useState } from 'react';
import author_thumbnail from '../../../../../images/thumbnails/author_thumbnail.png';
import book_thumbnail from '../../../../../images/thumbnails/book_thumbnail.png';
import publisher_thumbnail from '../../../../../images/thumbnails/publisher_thumbnail.png';

import axios from 'axios';

interface ThumbnailWithFallbackProps extends ImgHTMLAttributes<any> {
  url?: string;
  recordType: string;
  linkTo?: string;
}

const ThumbnailWithFallback: React.FC<ThumbnailWithFallbackProps> = ({ url, recordType }) => {
  const [imgSrc, setImgSrc] = useState('');

  const fetchThumbnail = async (url: string): Promise<string> => {
    try {
      const response = await axios.get(url, { responseType: 'blob' });
      const contentType = response.headers['Content-Type'] || 'image/jpeg';
      const blob = new Blob([response.data], { type: contentType as string });
      return URL.createObjectURL(blob);
    } catch (error) {
      // Commented to avoid console spamming
      // console.error('Error fetching image', error);
      throw error;
    }
  };

  useMemo(() => {
    if (!url) {
      console.error('Invalid URL');
      return;
    }

    if (recordType === 'Book') {
      fetchThumbnail(url)
        .then(setImgSrc)
        .catch(error => {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx

            if (error.response.status === 404) {
              // console.error('Resource not found');
              if (recordType === 'Book') {
                setImgSrc(book_thumbnail);
              }
              // switch (recordType) {
              //   case 'Book':
              //     setImgSrc(book_thumbnail);
              //     break;
              //   case 'Author':
              //     setImgSrc(author_thumbnail);
              //     break;
              //   case 'Publisher':
              //     setImgSrc(publisher_thumbnail);
              //     break;
              //   default:
              //     setImgSrc('');
              //     break;
            }
          } else if (error.request) {
            console.error('No response received', error.request);
          } else {
            console.error('Error', error.message);
          }
        });
    }
    // Temporary solution to avoid unneccesary requests until I decide if I want to use images for authors and publishers
    switch (recordType) {
      case 'Author':
        setImgSrc(author_thumbnail);

        break;
      case 'Publisher':
        setImgSrc(publisher_thumbnail);
        break;
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
