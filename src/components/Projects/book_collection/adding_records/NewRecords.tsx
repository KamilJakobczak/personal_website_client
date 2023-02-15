import { useState } from 'react';

import { Link } from 'react-router-dom';
import Button from '../Button';

// interface NewRecordsProps {
//   resetComponent: string;
//   resetBooleans: boolean;
// }

const NewRecords: React.FC = () => {
  const showButtons = () => {
    const elements = [
      'book',
      'author',
      'genre',
      'publisher',
      'translator',
      'collection',
    ];
    return (
      <>
        {elements.map(element => {
          return (
            <Button
              key={element}
              className='new_records__item'
              linkEnd={element}
              text={element}
              linkPath='/apps/collection/add'
            />
          );
        })}
      </>
    );
  };

  return <div className='new_records'>{showButtons()}</div>;
};
export default NewRecords;
