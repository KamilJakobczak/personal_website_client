import { useState, useRef } from 'react';

enum SearchCategories {
  Author = 'Author',
  Book = 'Book',
  Publisher = 'Publisher',
}

const Search: React.FC = () => {
  const [searchInput, setSearchInput] = useState('');
  const [activeCategory, setActiveCategory] = useState('Book');

  const dropdown = useRef<HTMLUListElement>(null);

  const dropdownCloseListener = (event: MouseEvent) => {
    const target = event.target as Element;
    if (
      target.classList.contains(
        'bookCollection__search__searchBox_dropdown_default'
      )
    ) {
    } else {
      dropdown &&
        dropdown.current &&
        dropdown.current.classList.remove('active');
    }
  };

  const handleDefaultClick = () => {
    dropdown && dropdown.current && dropdown.current.classList.add('active');
    document.body.addEventListener('click', dropdownCloseListener);
  };
  const handleOptionClick = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => {
    const text = e.currentTarget.innerHTML;
    const defaultElement = document.querySelector(
      '.bookCollection__search__searchBox_dropdown_default'
    );

    dropdown && dropdown.current && dropdown.current.classList.remove('active');
    defaultElement && (defaultElement.innerHTML = text);
    document.body.removeEventListener('click', dropdownCloseListener);
    setActiveCategory(text);
  };

  return (
    <div className='bookCollection__search '>
      <div className='bookCollection__search__searchBox'>
        <div className='bookCollection__search__searchBox_dropdown'>
          <div
            className='bookCollection__search__searchBox_dropdown_default'
            onClick={() => {
              handleDefaultClick();
            }}
          >
            {SearchCategories.Book}
          </div>
          <ul ref={dropdown}>
            <li
              onClick={e => {
                handleOptionClick(e);
              }}
            >
              {SearchCategories.Author}
            </li>
            <li
              onClick={e => {
                handleOptionClick(e);
              }}
            >
              {SearchCategories.Book}
            </li>
            <li
              onClick={e => {
                handleOptionClick(e);
              }}
            >
              {SearchCategories.Publisher}
            </li>
          </ul>
        </div>
        <div className='bookCollection__search__searchBox_searchField'>
          <input
            className='bookCollection__search__searchBox_searchField_input'
            placeholder='Search'
            value={searchInput}
            onChange={e => {
              setSearchInput(e.target.value);
            }}
            type='text'
          />
          <i className='fas fa-search'></i>
        </div>
      </div>
    </div>
  );
};

export default Search;
