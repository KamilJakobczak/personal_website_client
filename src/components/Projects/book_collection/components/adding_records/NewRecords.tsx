import { useState } from 'react';

import { Link } from 'react-router-dom';
import Button from '../general-purpose/Button';

const NewRecords: React.FC = () => {
  const showButtons = () => {
    const elements = [
      'book',
      'author',
      'genre',
      'publisher',
      'translator',
      'book series',
    ];
    return (
      <>
        {elements.map(element => {
          return (
            <Button
              key={element}
              className='bookCollection__newRecords_item'
              linkEnd={element.replace(' ', '')}
              text={element}
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
