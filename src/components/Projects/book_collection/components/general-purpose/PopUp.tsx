import { useState } from 'react';
import Button from './Button';
import { useMutation } from '@apollo/client';

interface PopupProps {
  popupToggle: React.Dispatch<React.SetStateAction<boolean>>;
  handleDelete: () => void;
}

const Popup: React.FC<PopupProps> = ({ popupToggle, handleDelete }) => {
  const [active, setActive] = useState(false);

  return (
    <div>
      <p>Are you sure you want to delete this record?</p>
      <Button className='' text='yes' handleClick={handleDelete} />
      <Button className='' text='no' handleClick={() => popupToggle(false)} />
    </div>
  );
};

export default Popup;
