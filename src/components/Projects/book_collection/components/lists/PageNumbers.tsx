import React from 'react';

interface PageNumberProps {
  currentPage: number;
  totalPages: number;
  setActivePage: React.Dispatch<React.SetStateAction<number>>;
}

const PageNumbers: React.FC<PageNumberProps> = ({ currentPage, totalPages }) => {
  const separationString = '. . .';
  const handlePageClick = (pageNumber: number | string, e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    const { target } = e;
    if (target instanceof HTMLElement) {
      if (target.innerText === separationString) {
        return;
      }
      const pageElements = document.querySelectorAll('.bookCollection__list_pages-page');
      pageElements.forEach(page => page.classList.remove('active'));
      target.parentElement?.classList.add('active');
    }
  };

  const getPagination = () => {
    const pages: (string | number)[] = [];
    const pageWindow = 4;

    if (totalPages <= 10) {
      for (let i = 1; i < totalPages; i++) {
        pages.push(i);
      } // 1 2 3 4 5 6 7 8 9 10 11 12 13 14
    } else {
      for (let i = 1; i <= totalPages; i++) {
        if (i <= pageWindow) {
          pages.push(i);
        } else if (i > totalPages - pageWindow) {
          pages.push(i);
        } else {
          if (pages.lastIndexOf(separationString) === -1) {
            pages.push(separationString);
          }
        }
      }
    }
    console.log(pages);
    return pages;
  };

  const pagesArr = getPagination();

  const displayNumbers = () => {
    return pagesArr.map((page, index) => (
      <div key={index} onClick={e => handlePageClick(page, e)} className='bookCollection__list_pages-page'>
        <span>{page}</span>
      </div>
    ));
  };

  return <div className='bookCollection__list_pages'>{displayNumbers()}</div>;
};
export default PageNumbers;
