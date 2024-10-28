import { Link, useNavigate } from 'react-router-dom';

interface ButtonProps {
  className: string;
  handleClick?: () => void | React.Dispatch<React.SetStateAction<boolean>>;
  linkPath?: string;
  linkEnd?: string;
  text?: string;
  goBack?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  className,
  handleClick,
  linkPath,
  linkEnd,
  text,
  goBack,
}) => {
  const path = `${linkPath}/${linkEnd || ''}`;
  const navigate = useNavigate();
  const handleSubmit = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    if (!goBack && handleClick) {
      handleClick();
    } else if (goBack) {
      navigate(-1);
    }
  };
  return (
    <div
      className={`${className} collectionButton`}
      onClick={e => handleSubmit(e)}
    >
      {!linkPath && <span>{text || 'submit'}</span>}
      {linkPath && <Link to={path}>{text}</Link>}
    </div>
  );
};
export default Button;
