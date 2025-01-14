import { useState } from 'react';

import { Link } from 'react-router-dom';
import Button from '../general-purpose/Button';
import { useTranslation } from 'react-i18next';

const NewRecords: React.FC = () => {
  const { t } = useTranslation();
  const showButtons = () => {
    const elements = [
      { name: 'book', text: t('book') },
      { name: 'author', text: t('author') },
      { name: 'genre', text: t('genre') },
      { name: 'publisher', text: t('publisher') },
      { name: 'translator', text: t('translator') },
      { name: 'bookseries', text: t('singleBookSeries') },
    ];
    return (
      <>
        {elements.map(element => {
          return (
            <Button
              key={element.name}
              className='bookCollection__newRecords_item'
              linkEnd={element.name}
              text={element.text}
              linkPath='/apps/collection/add'
            />
          );
        })}
      </>
    );
  };

  return <div className='bookCollection__newRecords'>{showButtons()}</div>;
};
export default NewRecords;
