import { useTranslation } from 'react-i18next';
import { checkURL } from '../../utility/handlers/checkURL';
import EditButton from '../general-purpose/EditButton';
import List from '../lists/List';

interface PublisherProps {
  data: {
    id: string;
    address: {
      country: string;
      zipCode: string;
      city: string;
      street: string;
      buildingNr: string;
      placeNr: number;
    };
    name: string;
    website: string;
    books: [];
  };
  editable: boolean;
}

const Publisher: React.FC<PublisherProps> = ({ data, editable }) => {
  const { t } = useTranslation();
  const { id, address, name, books, website } = data;
  const { country, zipCode, city, street, buildingNr, placeNr } = address;

  const editableData = {
    id,
    name,
    books,
    website,
    country,
    zipCode,
    city,
    street,
    buildingNr,
    placeNr,
  };

  return (
    <div className='publisher'>
      <div className='publisher__name'>
        <h4>
          {name}
          {editable ? <EditButton data={editableData} /> : null}
        </h4>
      </div>

      {/* <div className='publisher__logo'>
         <div className='publisher__logo_img'>
          <img src='' alt='' />
        </div> 
      </div> */}
      <div className='publisher__data'>
        <div className='publisher__data_street'>
          <p>{t('street')}</p>
          <span>❖</span>
          <span>
            {street} {buildingNr}
            {placeNr ? `/${placeNr}` : null}
          </span>
        </div>
        <div className='publisher__data_city'>
          <p>{t('city')}</p>
          <span>❖</span>
          <span>{city}</span>
        </div>
        <div className='publisher__data_zipCode'>
          <p>{t('zipCode')}</p>
          <span>❖</span>
          <span>{zipCode}</span>
        </div>
        <div className='publisher__data_country'>
          <p>{t('country')}</p>
          <span>❖</span>
          <span>{country}</span>
        </div>
        {website ? (
          <div className='publisher__data_bioPages'>
            <a href={checkURL(website)} rel='noreferrer noopener' target='_blank'>
              {t('website')}
            </a>
          </div>
        ) : null}
      </div>

      {books.length > 0 ? (
        <div className='publisher__books'>
          <h5>{t('books')}</h5>
          <List data={books} nested={true} />
        </div>
      ) : null}
    </div>
  );
};

export default Publisher;
