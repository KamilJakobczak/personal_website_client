import { useTranslation } from 'react-i18next';
import Checkbox from './Checkbox';

interface FilterProps {
  handleCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>, name: string) => void;
  filterOptions: {
    name: string;
    data: {
      id: string;
      name: string;
      namePolish?: string;
    }[];
  };
}

const Filter: React.FC<FilterProps> = ({ handleCheckboxChange, filterOptions }) => {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const { name, data } = filterOptions;
  const className = `filter_${name}`;
  const translatedName = () => {
    if (name === 'genres') {
      return t('genres');
    }
    if (name === 'publishers') {
      return t('publishers');
    }
  };
  return (
    <div className={`filter_category ${className}`}>
      <legend className={'filter_category_legend'}>{translatedName()}</legend>
      {data.map((item: any) => {
        return (
          <div key={item.name} className={'filter_category_item'}>
            <label className='form-control' htmlFor={item.name}>
              <Checkbox name={name} id={item.id} handleCheckboxChange={handleCheckboxChange} />
              {currentLanguage === 'pl' ? (item.namePolish ? item.namePolish : item.name) : item.name}
            </label>
          </div>
        );
      })}
    </div>
  );
};
export default Filter;
