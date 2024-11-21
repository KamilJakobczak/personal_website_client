import React from 'react';
import { CoverCheckboxes, Currency } from '../../types';

interface PurchasedBookDetailsInterface {
  cover: CoverCheckboxes;
  updateState: React.Dispatch<React.SetStateAction<CoverCheckboxes[]>>;
}

const PurchasedBookDetails: React.FC<PurchasedBookDetailsInterface> = ({ cover, updateState }) => {
  const coverClass = cover.type.toLowerCase();
  const index = cover.id;

  const handleEdition = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (e.target.name) {
      case 'editionNumber':
        updateState(prevState => {
          const newState = prevState.map(book => {
            if (book.id === index) {
              return {
                ...book,
                edition: {
                  editionNumber: e.target.value,
                  editionYear: book.edition.editionYear,
                },
              };
            }
            return book;
          });
          return newState;
        });
        break;
      case 'editionYear':
        updateState(prevState => {
          const newState = prevState.map(book => {
            if (book.id === index) {
              return {
                ...book,
                edition: {
                  editionNumber: book.edition.editionNumber,
                  editionYear: e.target.value,
                },
              };
            }
            return book;
          });
          return newState;
        });
    }
  };
  const handlePrice = (e: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>) => {
    switch (e.target.name) {
      case 'price':
        updateState(prevState => {
          const newState = prevState.map(book => {
            if (book.id === index) {
              return { ...book, buyPrice: e.target.value };
            }
            return book;
          });
          return newState;
        });
        break;
      case 'currency':
        updateState(prevState => {
          const newState = prevState.map(book => {
            if (book.id === index) {
              return { ...book, currency: e.target.value as Currency };
            }

            return book;
          });
          return newState;
        });
    }
  };
  return (
    <div className={`userActions__form_element userActions__form_element-${coverClass}`}>
      <fieldset className='purchaseInfo'>
        <legend>{cover.type}</legend>
        <div className={`purchaseInfo_edition`}>
          <legend>Edition:</legend>
          <div>
            <label htmlFor={`editionNumber-${index}`}>number</label>
            <input
              name='editionNumber'
              id={`editionNumber-${index}`}
              type='number'
              min={0}
              max={20}
              value={cover.edition.editionNumber}
              onChange={e => handleEdition(e)}
            />
          </div>
          <div>
            <label htmlFor={`editionYear-${index}`}>year</label>
            <input
              name='editionYear'
              id={`editionYear-${index}`}
              type='number'
              min={1900}
              max={2100}
              value={cover.edition.editionYear}
              onChange={e => handleEdition(e)}
            />
          </div>
        </div>
        <div className={`purchaseInfo_price`}>
          <div>
            <label htmlFor={`price-${index}`}>Price:</label>
            <input
              name='price'
              id={`price-${index}`}
              type='number'
              min={0}
              max={200}
              value={cover.buyPrice}
              onChange={e => handlePrice(e)}
            />
          </div>
          <div>
            <label htmlFor={`currency-${index}`}>Currency:</label>
            <select name='currency' id={`currency-${index}`} onChange={e => handlePrice(e)}>
              <option value=''>select</option>
              <option value={Currency.PLN}>{Currency.PLN}</option>
              <option value={Currency.EUR}>{Currency.EUR}</option>
              <option value={Currency.USD}>{Currency.USD}</option>
            </select>
          </div>
        </div>
      </fieldset>
    </div>
  );
};
export default PurchasedBookDetails;
