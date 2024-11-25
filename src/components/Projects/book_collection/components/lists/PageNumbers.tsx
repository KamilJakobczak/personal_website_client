import React, { useEffect } from 'react';

interface PageNumberProps {
  activePage: number;
  totalPages: number;
  setActivePage: React.Dispatch<React.SetStateAction<number>>;
}

const PageNumbers: React.FC<PageNumberProps> = ({ activePage, totalPages, setActivePage }) => {
  const separationString = '. . .';

  useEffect(() => {
    const activeElement = document.querySelector(`[data-id="${activePage}"]`);
    activeElement?.classList.add('active');
  });

  useEffect(() => {
    const pageElements = document.querySelectorAll('.bookCollection__list_pages-page');
    pageElements.forEach(page => page.classList.remove('active'));
    const activeElement = document.querySelector(`[data-id="${activePage}"]`);
    activeElement?.classList.add('active');
  }, [activePage]);

  const handlePageClick = (pageNumber: number | string, e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { target } = e;
    if (target instanceof HTMLElement) {
      if (target.innerText === separationString) {
        return;
      }
      setActivePage(Number(target.innerHTML));
    }
  };

  const handleArrowClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { target } = e;
    if (target instanceof HTMLElement) {
      if (target.innerHTML === '&lt;') {
        if (activePage > 1) {
          setActivePage(activePage - 1);
        }
      }
      if (target.innerHTML === '&gt;') {
        if (activePage < totalPages) {
          setActivePage(activePage + 1);
        }
      }
    }
  };

  const getPagination = () => {
    let pages: (string | number)[] = [];
    const pageWindow = 4;

    if (totalPages <= 10) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    }

    if (totalPages > 10) {
      if (activePage <= pageWindow - 1) {
        for (let i = 1; i <= totalPages; i++) {
          if (i <= pageWindow || i > totalPages - pageWindow) {
            pages.push(i);
          } else if (pages.lastIndexOf(separationString) === -1) {
            pages.push(separationString);
          }
        }
      } else if (activePage >= pageWindow) {
        if (totalPages - activePage <= 7) {
          for (let i = totalPages - 9; i <= totalPages; i++) {
            pages.push(i);
          }
        } else {
          for (let i = activePage - 2; i <= totalPages; i++) {
            if ((i >= activePage - 2 && i < activePage + 2) || i > totalPages - pageWindow) {
              pages.push(i);
            } else if (pages.lastIndexOf(separationString) === -1) {
              pages.push(separationString);
            }
          }
        }
      }
    }
    return pages;
  };

  const pagesArr = getPagination();

  const displayNumbers = () => {
    return pagesArr.map((page, index) => (
      <div
        key={index}
        onClick={e => handlePageClick(page, e)}
        className='bookCollection__list_pages-page'
        data-id={page}
      >
        <span>{page}</span>
      </div>
    ));
  };

  return (
    <div className='bookCollection__list_pages'>
      {totalPages > 10 ? (
        <>
          <div className='bookCollection__list_pages-page' onClick={() => setActivePage(1)}>
            <span>{`I<<`}</span>
          </div>
          <div className='bookCollection__list_pages-page' onClick={e => handleArrowClick(e)}>
            <span>{`<`}</span>
          </div>
        </>
      ) : null}
      {displayNumbers()}
      {totalPages > 10 ? (
        <>
          <div className='bookCollection__list_pages-page' onClick={e => handleArrowClick(e)}>
            <span>{`>`}</span>
          </div>
          <div className='bookCollection__list_pages-page' onClick={() => setActivePage(totalPages)}>
            <span>{`>>I`}</span>
          </div>
        </>
      ) : null}
    </div>
  );
};
export default PageNumbers;
