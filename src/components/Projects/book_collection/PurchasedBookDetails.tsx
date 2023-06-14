import React, { useState } from 'react';
import { CoverCheckboxes, Currency } from './user/UserActions';

interface PurchasedBookDetailsInterface {
  cover: CoverCheckboxes;
  updateState: React.Dispatch<React.SetStateAction<CoverCheckboxes[]>>;
}

const PurchasedBookDetails: React.FC<PurchasedBookDetailsInterface> = ({
  cover,
}) => {
  const [editionNumber, setEditionNumber] = useState<string>('');
  const [editionYear, setEditionYear] = useState<string>('');
  const [currency, setCurrency] = useState<Currency>(Currency.PLN);
  const [buyPrice, setBuyPrice] = useState('');

  const coverClass = cover.type.toLowerCase();

  const handleCurrency = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target);
  };

  return (
    <div
      className={`userActions__form_element userActions__form_element-${coverClass}`}
    >
      <fieldset className={`${coverClass}-purchaseInfo`}>
        <legend>{cover.type}</legend>
        <div className={`${coverClass}-purchaseInfo__edition`}>
          <legend>Edition:</legend>
          <div>
            <label htmlFor='editionNumber'>number</label>
            <input
              id='editionNumber'
              type='number'
              min={0}
              max={20}
              value={editionNumber}
              onChange={e => setEditionNumber(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor='editionYear'>year</label>
            <input
              id='editionYear'
              type='number'
              min={1900}
              max={2100}
              value={editionYear}
              onChange={e => setEditionYear(e.target.value)}
            />
          </div>
        </div>
        <div className={`${coverClass}-purchaseInfo__price`}>
          <div>
            <label htmlFor='price'>Price:</label>
            <input
              type='number'
              min={0}
              max={200}
              id='price'
              value={buyPrice}
              onChange={e => setBuyPrice(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor='currency'>Currency:</label>
            <select
              name='currency'
              id='currency'
              onChange={e => handleCurrency(e)}
            >
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
