import List from '../lists/List';

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
      <div className='publisher__logo'>
        {/* <div className='publisher__logo_img'>
          <img src='' alt='' />
        </div> */}
      </div>
      <div className='publisher__data'>
        <div className='publisher__data_website'>
          <p>Website</p>
          <span>-</span>
          <span>{website}</span>
        </div>
        <div className='publisher__data_street'>
          <p>Street</p>
          <span>-</span>
          <span>
            {street} {buildingNr}
            {placeNr ? `/${placeNr}` : null}
          </span>
        </div>
        <div className='publisher__data_city'>
          <p>City</p>
          <span>-</span>
          <span>{city}</span>
        </div>
        <div className='publisher__data_zipCode'>
          <p>Zip Code</p>
          <span>-</span>
          <span>{zipCode}</span>
        </div>
        <div className='publisher__data_country'>
          <p>Country</p>
          <span>-</span>
          <span>{country}</span>
        </div>
      </div>

      <div className='publisher__books'>
        <h5>books</h5>
        <List data={books} nested={true} />
      </div>
    </div>
  );
};

export default Publisher;
