import { Link } from 'react-router-dom';
import coding_playground from '../../images/coding_playground.jpg';
import book_collection from '../../images/book_collection.jpg';
import useViewportHeight from './hooks/useViewportHeight';
const Projects: React.FC = () => {
  useViewportHeight('scroller__projects');

  return (
    <section className='scroller__projects'>
      <h2>Projects</h2>

      <div className='scroller__projects_container'>
        <h3>JS coding playground</h3>
        <div>
          <Link to='apps/coding'>
            <img src={coding_playground} alt='' />
          </Link>
        </div>
        <p>
          Coding playground for React that I wrote based on Udemy course. Two types of cells - code and text. Packages
          are automatically installed when you import them. Full interactions between separate code windows. Optional
          autosave.
        </p>
      </div>

      <div className='scroller__projects_container'>
        <h3>book collection</h3>
        <div>
          <Link to='apps/collection'>
            <img src={book_collection} alt='' />
          </Link>
        </div>
        <p>
          This project is the biggest one until now. Written all by myself using TypeScript, GraphQL, Node and React.
          The goal is to keep my book collection organised and to make it easier for my family to find a book that they
          want to read. One cool feature is a possibility of uploading ebook file so that my app gets metadata and
          speeds up the whole adding book process. I'll keep developing this project as it's something I'll be using for
          years to come.
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
