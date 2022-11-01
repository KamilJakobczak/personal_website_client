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
  };
}

const Publisher: React.FC<PublisherProps> = ({ data }) => {
  const { country, zipCode, city, street, buildingNr, placeNr } = data.address;
  return (
    <div className='publisher'>
      <h4 className='publisher__name'>{data.name}</h4>
      <div className='publisher__address'>
        <p className='publisher__address_country'>
          Country: <span>{country}</span>
        </p>
        <p className='publisher__address_zipCode'>
          Zip Code: <span>{zipCode}</span>
        </p>
        <p className='publisher__address_city'>
          City: <span>{city}</span>
        </p>
        <p className='publisher__address_street_address'>
          Address:{' '}
          <span>
            {street} {buildingNr}
            {placeNr ? `/${placeNr}` : null}
          </span>
        </p>
      </div>
      <div className='publisher__website'>
        <p className='publisher__website_address'>
          Website: <span>{data.website}</span>
        </p>
      </div>
      <div className='publisher__books'>BOOKS</div>
    </div>
  );
};

export default Publisher;
