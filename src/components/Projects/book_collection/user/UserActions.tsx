import Button from '../Button';
import { useState } from 'react';
import Select from '../Select';
interface UserActionsInterface {
  parentClass: string;
}
enum BookStatus {
  READ = 'READ',
  UNREAD = 'UNREAD',
  WANTEDTOBUY = 'WANTEDTOBUY',
  WANTEDTOREAD = 'WANTEDTOREAD',
}
enum Currency {
  EUR = 'EUR',
  PLN = 'PLN',
  USD = 'USD',
}

const UserActions: React.FC<UserActionsInterface> = ({ parentClass }) => {
  const [showOptions, setShowOptions] = useState(false);
  const [coverTypes, setCoverTypes] = useState<{
    paperback: boolean;
    hardcover: boolean;
    ebook: boolean;
  }>({ paperback: false, hardcover: false, ebook: false });
  const [editionNumber, setEditionNumber] = useState<string>('');
  const [editionYear, setEditionYear] = useState<string>('');
  const [bookStatus, setBookStatus] = useState('');

  const handleCoverTypeChecboxes = (e: React.ChangeEvent<HTMLInputElement>) => {
    let updatedCover: {};

    setCoverTypes(prevState => {
      switch (e.target.id) {
        case 'paperback':
          updatedCover = { paperback: !prevState.paperback };
          break;
        case 'hardcover':
          updatedCover = { hardcover: !prevState.hardcover };
          break;
        case 'ebook':
          updatedCover = { ebook: !prevState.ebook };
          break;
      }
      return {
        ...prevState,
        ...updatedCover,
      };
    });
  };

  const optionsForm = () => {
    return (
      <div className={`${parentClass}__userActions__options userActions`}>
        <form
          className={`${parentClass}__userActions__options_form userActions__form`}
        >
          <div className='userActionsForm_element userActions__form_element-status '>
            <label htmlFor='bookStatus'>Book status</label>
            <select
              name='bookStatus'
              id='bookStatus'
              className=''
              onChange={e => setBookStatus(e.target.value)}
            >
              <option value=''>-- select --</option>
              <option value={BookStatus.READ}>{BookStatus.READ}</option>
              <option value={BookStatus.UNREAD}>{BookStatus.UNREAD}</option>
              <option value={BookStatus.WANTEDTOBUY}>
                {BookStatus.WANTEDTOBUY}
              </option>
              <option value={BookStatus.WANTEDTOREAD}>
                {BookStatus.WANTEDTOREAD}
              </option>
            </select>
          </div>
          {bookStatus === BookStatus.READ && (
            <>
              <div className='userActionsForm_element userActions__form_element-coverType'>
                <label htmlFor='coverType'>
                  Pick your book's cover type (select more than one if needed):
                </label>
                <label>
                  paperback
                  <input
                    type='checkbox'
                    name='coverType'
                    id='paperback'
                    onChange={e => handleCoverTypeChecboxes(e)}
                  />
                </label>
                <label>
                  hardcover
                  <input
                    type='checkbox'
                    name='coverType'
                    id='hardcover'
                    onChange={e => handleCoverTypeChecboxes(e)}
                  />
                </label>
                <label>
                  ebook
                  <input
                    type='checkbox'
                    name='coverType'
                    id='ebook'
                    onChange={e => handleCoverTypeChecboxes(e)}
                  />
                </label>
              </div>
              <div className='userActionsForm_element userActions__form_element-editions'>
                <label htmlFor=''>
                  Edition number
                  <input
                    type='number'
                    min={0}
                    max={20}
                    value={editionNumber}
                    onChange={e => setEditionNumber(e.target.value)}
                  />
                </label>
                <label htmlFor=''>
                  Edition year
                  <input
                    type='number'
                    min={1900}
                    max={2100}
                    value={editionYear}
                    onChange={e => setEditionYear(e.target.value)}
                  />
                </label>
              </div>

              <div className='userActionsForm_element userActions__form_element-price'>
                <label htmlFor='price'>
                  Price
                  <input type='number' min={0} max={200} id='price' />
                </label>

                <label htmlFor='currency'>Currency</label>
                <select className='' name='currency' id='currency'>
                  <option value={Currency.PLN}>PLN</option>
                  <option value={Currency.EUR}>EUR</option>
                  <option value={Currency.USD}>USD</option>
                </select>
              </div>
            </>
          )}
          <Button
            className={`${parentClass}__userActions__submit userActions__form_element-submit`}
            text='add to library'
          />
        </form>
      </div>
    );
  };
  return (
    <div className={`${parentClass}__userActions`}>
      {!showOptions && (
        <Button
          className={`${parentClass}__userActions_showDetails`}
          text='add book to your library'
          handleClick={() => setShowOptions(true)}
        />
      )}
      {showOptions && optionsForm()}
    </div>
  );
};

export default UserActions;
