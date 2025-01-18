import React from 'react';
import { LANGUAGES } from '../../languages';
import { useTranslation } from 'react-i18next';

const LanguageChange: React.FC = () => {
  const { i18n, t } = useTranslation();
  const onChangeLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const lang_code = e.target.value;
    i18n.changeLanguage(lang_code);
  };
  return (
    <div className='languageSelect'>
      <select defaultValue={i18n.language} onChange={e => onChangeLanguage(e)}>
        {LANGUAGES.map(({ code, label }) => (
          <option key={code} value={code}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
};
export default LanguageChange;
