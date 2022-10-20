const Business: React.FC = () => {
  return (
    <section className='business'>
      <h2>Skills and contact</h2>
      <div className='skills'>
        <ul className='skills__main'>
          <h3>Main technologies:</h3>
          <li>Javascript</li>
          <li>React</li>
          <li>CSS (SASS)</li>
          <li>HTML</li>
        </ul>
        <ul className='skills__additional'>
          <h3>Technologies that I used in my biggest projects:</h3>
          <li>GraphQL</li>
          <li>Redux</li>
          <li>Typescript</li>
          <li>NodeJS</li>
          <li>MongoDB</li>
          <li>Prisma</li>
        </ul>
        <ul className='skills__recognized'>
          <h3>
            Technologies that I have basic knowledge of and I used those in some
            minor projects or exercises:
          </h3>
          <li>Webpack</li>
          <li>Bootstrap</li>
        </ul>
        <ul className='skills__in_progress'>
          <h3>Technologies I'm learning:</h3>
          <li>React Native</li>
        </ul>
      </div>
      <div className='contact'>
        <h4>send me a message!</h4>
        <ul>
          <li>Github</li>
          <li>Mail</li>
          <li>LinkedIn</li>
        </ul>
      </div>
    </section>
  );
};

export default Business;
