import List from './List';

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
      <div className='author__data'>
        <p className='author__data_nationality'>
          Nationality: <span>{nationality}</span>
        </p>
        <p className='author__data_birth_year'>
          Year of birth: <span>{birthYear}</span>
        </p>
      </div>
      <div className='author__books'>
        <List data={books} nested={true} />
      </div>
    </div>
  );
};

export default Author;
