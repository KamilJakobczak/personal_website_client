import List from './List';

interface PublisherProps {
  data: {
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
}

const Publisher: React.FC<PublisherProps> = ({ data }) => {
  const { address, name, books, website } = data;
  const { country, zipCode, city, street, buildingNr, placeNr } = address;

  return (
    <div className='publisher'>
      <h4 className='publisher__name'>{name}</h4>
      <div className='publisher__website'>
        <p className='publisher__website_address'>
          Website: <span>{website}</span>
        </p>
      </div>
      <div className='publisher__address'>
        <p className='publisher__address_street_address'>
          Address:{' '}
          <span>
            {street} {buildingNr}
            {placeNr ? `/${placeNr}` : null}
          </span>
        </p>
        <p className='publisher__address_city'>
          City: <span>{city}</span>
        </p>
        <p className='publisher__address_zipCode'>
          Zip Code: <span>{zipCode}</span>
        </p>
        <p className='publisher__address_country'>
          Country: <span>{country}</span>
        </p>
      </div>

      <div className='publisher__books'>
        <h5>books</h5>
        <List data={books} nested={true} />
      </div>
    </div>
  );
};

export default Publisher;
