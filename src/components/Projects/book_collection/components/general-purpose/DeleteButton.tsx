import deleteIcon from '../../../../../images/delete50.png';

interface DeleteButtonProps {
  id: string;
  parentClass: string;
  popupToggle: React.Dispatch<React.SetStateAction<boolean>>;
  popupState: boolean;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ id, parentClass, popupState, popupToggle }) => {
  // const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
  //   // const target = e.target as HTMLElement;
  //   // const container = target.parentElement?.parentElement;
  // };
  return (
    <div className={`${parentClass}_delete`} onClick={() => popupToggle(true)}>
      <img src={deleteIcon} alt='delete icon' />
    </div>
  );
};

export default DeleteButton;
