import { ReactComponent as LinkedInIcon } from '../../images/linkedIn_icon.svg';
import { ReactComponent as GithubIcon } from '../../images/github_icon.svg';
import { ReactComponent as MailIcon } from '../../images/mail_icon.svg';
import SkillsSlider from './SkillsSlider';

const Business: React.FC = () => {
  const mainSkills = ['React', 'Typescript', 'CSS (SASS)', 'HTML'];
  const secondarySkills = [
    'Javascript',
    'GraphQL',
    'Apollo',
    'Redux',
    'MongoDB',
    'Prisma',
    'NodeJS',
  ];

  return (
    <section className='scroller__business'>
      <h3>Skills and contact</h3>
      <SkillsSlider />
      <div className='scroller__business_skills'>
        <div className='skills__main'>
          <h4>Main skills:</h4>
          <ul>
            {mainSkills.map(skill => {
              return <li key={skill}>{skill}</li>;
            })}
          </ul>
        </div>
        <div className='skills__additional'>
          <h4>I can use:</h4>
          <ul>
            {secondarySkills.map(skill => {
              return <li key={skill}>{skill}</li>;
            })}
          </ul>
        </div>
        <div className='skills__recognized'>
          <h4>Basic knowledge of:</h4>
          <ul>
            <li>Webpack</li>
            <li>Bootstrap</li>
            <li>Docker</li>
          </ul>
        </div>
        <div className='skills__in_progress'>
          <h4>Skills I'm learning:</h4>
          <ul>
            <li>React Native</li>
          </ul>
        </div>
      </div>
      <div className='scroller__business_contact'>
        <h5>send me a message!</h5>
        <ul>
          <li>
            <a href='https://github.com/KamilJakobczak'>
              <GithubIcon />
            </a>
          </li>
          <li>
            <a href='https://www.linkedin.com/in/kamil-jak%C3%B3bczak-34b34345/'>
              <LinkedInIcon />
            </a>
          </li>
          <li>
            <a href='mailto: k_j1@vp.pl'>
              <MailIcon />
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Business;
