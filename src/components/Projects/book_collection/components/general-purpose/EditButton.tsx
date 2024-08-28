import { Link, useLocation } from 'react-router-dom';
import editIcon from '../../../../../images/edit50.png';
interface EditButtonProps {
  data: object;
}
const EditButton: React.FC<EditButtonProps> = ({ data }) => {
  const location = useLocation();
  // console.log(location.pathname);
  return (
    <Link to={`${location.pathname}/edit`} state={data}>
      <img src={editIcon} alt='edit icon' />
    </Link>
  );
};
export default EditButton;
