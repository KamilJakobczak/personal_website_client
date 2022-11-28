import { Link, useNavigate } from 'react-router-dom';

interface ButtonProps {
  className: string;
  handleClick?: () => void;
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
  const handleSubmit = () => {
    if (!goBack && handleClick) {
      handleClick();
    } else if (goBack) {
      navigate(-1);
    }
  };
  return (
    <div
      className={`${className} collection_button`}
      onClick={() => handleSubmit()}
    >
      <span>{!linkPath && (text || 'submit')}</span>
      {linkPath && <Link to={path}>{text}</Link>}
    </div>
  );
};
export default Button;
