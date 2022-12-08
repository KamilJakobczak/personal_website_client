const Business: React.FC = () => {
  return (
    <section className='scroller__business'>
      <h3>Skills and contact</h3>
      <div className='scroller__business_skills'>
        <ul className='skills__main'>
          <h4>Main technologies:</h4>
          <li>Javascript</li>
          <li>React</li>
          <li>Typescript</li>
          <li>NodeJS</li>
          <li>CSS (SASS)</li>
          <li>HTML</li>
        </ul>
        <ul className='skills__additional'>
          <h4>Technologies that I used in my biggest projects:</h4>
          <li>GraphQL</li>
          <li>Apollo</li>
          <li>Redux</li>
          <li>MongoDB</li>
          <li>Prisma</li>
        </ul>
        <ul className='skills__recognized'>
          <h4>Technologies that I have basic knowledge of:</h4>
          <li>Webpack</li>
          <li>Bootstrap</li>
        </ul>
        <ul className='skills__in_progress'>
          <h4>Technologies I'm learning:</h4>
          <li>React Native</li>
        </ul>
      </div>
      <div className='scroller__business_contact'>
        <h5>send me a message!</h5>
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
