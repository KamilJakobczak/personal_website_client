import { useLazyQuery } from '@apollo/client';
import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { LOAD_SEARCH } from '../../../../../GraphQL/queries';
import CustomError from '../../../../CustomError';
import LoadingSpinner from '../../../../LoadingSpinner';
import { RecordValues } from '../lists/List';
import { useTranslation } from 'react-i18next';

enum SearchCategories {
  Author = 'Author',
  Book = 'Book',
  Publisher = 'Publisher',
}

const Search: React.FC = () => {
  const { t } = useTranslation();
  const [searchInput, setSearchInput] = useState('');
  const [activeCategory, setActiveCategory] = useState('Book');
  const dropdown = useRef<HTMLUListElement>(null);
  const [loadSearch, { called, loading, data, error }] = useLazyQuery(LOAD_SEARCH, {
    variables: { contains: searchInput, type: activeCategory },
  });

  const dropdownCloseListener = (event: MouseEvent) => {
    const target = event.target as Element;
    if (target.classList.contains('bookCollection__search__searchBox_dropdown_default')) {
    } else {
      dropdown && dropdown.current && dropdown.current.classList.remove('active');
    }
  };
  const searchResultsCloseListener = (event: MouseEvent) => {
    const target = event.target as Element;
    const resultsContainer = document.querySelector('.bookCollection__search__searchBox_searchField_results');

    if (target.className.includes('bookCollection__search') || target.className.includes('fa-search')) {
    } else {
      resultsContainer?.classList.remove('active');
    }
  };

  const handleDefaultClick = () => {
    dropdown && dropdown.current && dropdown.current.classList.add('active');
    document.body.addEventListener('click', dropdownCloseListener);
  };
  const handleOptionClick = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    const id = e.currentTarget.getAttribute('data-name');
    const text = e.currentTarget.innerHTML;
    const defaultElement = document.querySelector('.bookCollection__search__searchBox_dropdown_default');
    if (id) {
      dropdown && dropdown.current && dropdown.current.classList.remove('active');
      defaultElement && (defaultElement.innerHTML = text);
      document.body.removeEventListener('click', dropdownCloseListener);
      setActiveCategory(id);
    }
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
    if (e.target.value.length >= 2) {
      setTimeout(() => {
        loadSearch();
      }, 200);
    }
  };
  const showSearchResults = () => {
    const dataArr = data.search;
    const resultsContainer = document.querySelector('.bookCollection__search__searchBox_searchField_results');
    resultsContainer?.classList.add('active');
    document.body.addEventListener('click', searchResultsCloseListener);

    return dataArr.map((record: RecordValues) => {
      let linkPath = '';
      switch (activeCategory) {
        case SearchCategories.Author:
          linkPath = 'authors';
          break;
        case SearchCategories.Book:
          linkPath = 'books';
          break;
        case SearchCategories.Publisher:
          linkPath = 'publishers';
          break;
        default:
          break;
      }
      return (
        <div className='bookCollection__search__searchBox_searchField_results_item' key={record.id}>
          <Link to={`${linkPath}/${record.id.slice(-10)}`} state={{ id: record.id }} onClick={() => setSearchInput('')}>
            {record.title ? record.title : null}
            {record.lastName ? `${record.lastName} ${record.firstName}` : null}
            {record.name ? record.name : null}
          </Link>
        </div>
      );
    });
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
            {t('book')}
          </div>
          <ul ref={dropdown}>
            <li
              data-name={SearchCategories.Author}
              onClick={e => {
                handleOptionClick(e);
              }}
            >
              {t('author')}
            </li>
            <li
              data-name={SearchCategories.Book}
              onClick={e => {
                handleOptionClick(e);
              }}
            >
              {t('book')}
            </li>
            <li
              data-name={SearchCategories.Publisher}
              onClick={e => {
                handleOptionClick(e);
              }}
            >
              {t('publisher')}
            </li>
          </ul>
        </div>
        <div className='bookCollection__search__searchBox_searchField'>
          <input
            className='bookCollection__search__searchBox_searchField_input'
            placeholder={t('search')}
            value={searchInput}
            onChange={e => handleInputChange(e)}
            type='text'
          />
          <i className='fas fa-search'></i>
          <div className='bookCollection__search__searchBox_searchField_results'>
            {called && error && <CustomError text={error.message} />}
            {called && loading && !data && <LoadingSpinner />}
            {data && !loading && !error && showSearchResults()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
