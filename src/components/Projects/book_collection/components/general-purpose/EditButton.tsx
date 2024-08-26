import editIcon from '../../../../../images/edit50.png';
interface EditButtonProps {}
const EditButton: React.FC<EditButtonProps> = () => {
  return (
    <span>
      <img src={editIcon} alt='edit icon' />
    </span>
  );
};
export default EditButton;
