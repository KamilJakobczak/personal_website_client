import { checkURL } from '../../utility/handlers/checkURL';
import List from '../lists/List';

interface AuthorProps {
  data: {
    firstName: string;
    lastName: string;
    nationality?: string;
    birthYear?: number;
    bioPages?: {
      wiki: string;
      goodreads: string;
      lubimyczytac: string;
    };
    books: [];
  };
}

const Author: React.FC<AuthorProps> = ({ data }) => {
  const { firstName, lastName, nationality, birthYear, books, bioPages } = data;
  console.log(data);
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
        <div className='author__data_wiki'>
          <p>Wikipedia</p>
          <span>-</span>
          <span>
            {bioPages && bioPages.wiki ? (
              <a
                href={checkURL(bioPages.wiki)}
                rel='noreferrer noopener'
                target='_blank'
              >
                click
              </a>
            ) : null}
          </span>
        </div>
        <div className='author__data_goodreads'>
          <p>Goodreads</p>
          <span>-</span>
          <span>
            {bioPages && bioPages.goodreads ? (
              <a
                href={checkURL(bioPages.goodreads)}
                rel='noreferrer noopener'
                target='_blank'
              >
                click
              </a>
            ) : null}
          </span>
        </div>
        <div className='author__data_lubimyczytac'>
          <p>Lubimyczytac</p>
          <span>-</span>
          <span>
            {bioPages && bioPages.lubimyczytac ? (
              <a
                href={checkURL(bioPages.lubimyczytac)}
                rel='noreferrer noopener'
                target='_blank'
              >
                click
              </a>
            ) : null}
          </span>
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
