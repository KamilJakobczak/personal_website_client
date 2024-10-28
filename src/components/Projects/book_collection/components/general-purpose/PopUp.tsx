import { useState } from 'react';
import Button from './Button';
import { useMutation } from '@apollo/client';
import { DELETE_BOOK } from '../../../../../GraphQL/mutations';

interface PopupProps {
  popupToggle: React.Dispatch<React.SetStateAction<boolean>>;
}

const Popup: React.FC<PopupProps> = ({ popupToggle }) => {
  const [active, setActive] = useState(false);

  const [deleteBook] = useMutation(DELETE_BOOK);

  const handleDelete = () => {};
  return (
    <div>
      <p>Are you sure you want to delete this record?</p>
      <Button className='' text='yes' handleClick={handleDelete} />
      <Button className='' text='no' handleClick={() => popupToggle(false)} />
    </div>
  );
};

export default Popup;
