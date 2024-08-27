import editIcon from '../../../../../images/edit50.png';
interface EditButtonProps {
  id: string;
}
const EditButton: React.FC<EditButtonProps> = ({ id }) => {
  return (
    <span>
      <img src={editIcon} alt='edit icon' />
    </span>
  );
};
export default EditButton;
