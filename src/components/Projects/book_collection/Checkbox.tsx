import { useState } from 'react';
interface CheckboxProps {
  name: string;
  id: string;
  handleCheckboxChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    name: string
  ) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({
  name,
  id,
  handleCheckboxChange,
}) => {
  const [checked, setChecked] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    checked ? setChecked(false) : setChecked(true);
    handleCheckboxChange(e, name);
  };

  return (
    <input
      type='checkbox'
      id={id}
      name={name}
      defaultChecked={checked}
      onChange={e => handleChange(e)}
    />
  );
};
export default Checkbox;
