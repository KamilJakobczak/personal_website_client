import { Link, useNavigate } from 'react-router-dom';

interface ButtonProps {
  className: string;
  handleClick?: () => void;
  linkPath?: string;
  text?: string;
  goBack?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  className,
  handleClick,
  linkPath,
  text,
  goBack,
}) => {
  const path = `${linkPath}/${text}`;
  const navigate = useNavigate();
  return (
    <div
      className={`${className} collection_button`}
      onClick={e => {
        if (goBack) navigate(-1);
        if (handleClick) handleClick();
      }}
    >
      <span>{!linkPath && (text || 'submit')}</span>
      {linkPath && <Link to={path}>{text}</Link>}
    </div>
  );
};
export default Button;
