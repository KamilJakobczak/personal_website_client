import { Link } from 'react-router-dom';
import coding_playground from '../../images/coding_playground.jpg';
import book_collection from '../../images/book_collection.jpg';
const Projects: React.FC = () => {
  return (
    <section className='scroller__projects'>
      <h3>Projects</h3>

      <div className='scroller__projects_container'>
        <h4>JS coding playground</h4>
        <div>
          <Link to='apps/coding'>
            <img src={coding_playground} alt='' />
          </Link>
        </div>
        <p>
          Coding playground for React that I wrote based on Udemy course. Two
          types of cells - code and text. Packages are automatically installed
          when you import them. Full interactions between separate code windows.
          Optional autosave.
        </p>
      </div>

      <div className='scroller__projects_container'>
        <h4>book collection</h4>
        <div>
          <Link to='apps/collection'>
            <img src={book_collection} alt='' />
          </Link>
        </div>
        <p>
          This project is the biggest one until now. Written all by myself,
          using TypeScript, GraphQL, Node and React. Ultimately there will be
          user's log in support and a possibility to add books to the database
          by sending an ebook and reading its metadata.
        </p>
      </div>

      {/* <div className='projects__container'>
        <h3>blog</h3>
        <div>
          <Link to='apps/blog'>
            <img src='' alt='' />
          </Link>
        </div>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deleniti,
          beatae.
        </p>
      </div> */}

      {/* <div className='projects__container'>
        <h3>gallery</h3>
        <div>
          <Link to='apps/gallery'>
            <img src='' alt='' />
          </Link>
        </div>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deleniti,
          beatae.
        </p>
      </div> */}
    </section>
  );
};

export default Projects;
