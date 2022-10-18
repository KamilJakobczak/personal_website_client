import { Router, Route, Routes, Link } from 'react-router-dom';
const Projects = () => {
  return (
    // <Router>
    <section className='projects'>
      <h2>Projects</h2>

      <div className='projects__container'>
        <h3>JS coding playground</h3>
        <div>
          <Link to='/jamar_cp'>
            <img src='' alt='' />
          </Link>
        </div>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deleniti,
          beatae.
        </p>
      </div>

      <div className='projects__container'>
        <h3>book collection</h3>
        <div>
          <Link to='/book_collection'>
            <img src='' alt='' />
          </Link>
        </div>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deleniti,
          beatae.
        </p>
      </div>

      <div className='projects__container'>
        <h3>blog</h3>
        <div>
          <Link to='/blog'>
            <img src='' alt='' />
          </Link>
        </div>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deleniti,
          beatae.
        </p>
      </div>

      <div className='projects__container'>
        <h3>gallery</h3>
        <div>
          <Link to='gallery'>
            <img src='' alt='' />
          </Link>
        </div>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deleniti,
          beatae.
        </p>
      </div>
    </section>
  );
};

export default Projects;
