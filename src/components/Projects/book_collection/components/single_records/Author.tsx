import List from '../lists/List';

interface AuthorProps {
  data: {
    firstName: string;
    lastName: string;
    nationality?: string;
    birthYear?: number;
    books: [];
  };
}

const Author: React.FC<AuthorProps> = ({ data }) => {
  const { firstName, lastName, nationality, birthYear, books } = data;

  return (
    <div className='author'>
      <h4 className='author__name'>
        {firstName} {lastName}
      </h4>
      <div className='author__cover'>
        {/* <div className='author__cover_img'>
          <img src='' alt='' />
        </div> */}
      </div>
      <div className='author__data'>
        <div className='author__data_nationality'>
          <p>Nationality</p>
          <span>-</span>
          <span>{nationality}</span>
        </div>
        <div className='author__data_birth_year'>
          <p>Year of birth</p>
          <span>-</span>
          <span>{birthYear}</span>
        </div>
      </div>
      <div className='author__books'>
        <h5>books</h5>
        <List data={books} nested={true} />
      </div>
    </div>
  );
};

export default Author;
