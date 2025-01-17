import my_face from '../../images/my_face.jpg';
import useViewportHeight from './hooks/useViewportHeight';

const WelcomeMessage: React.FC = () => {
  useViewportHeight('scroller__welcomeMessage');
  return (
    <div className='scroller__welcomeMessage'>
      <div className='scroller__welcomeMessage_container'>
        <div>
          <div className='image_container'>
            <img src={my_face} alt="jamar's face" />
          </div>
          <p>
            I'm thrilled that you've decided to visit! Allow me to share a bit about myself. I am a homegrown front-end
            developer with a strong focus on React, though I’m not limited to it. I’m passionate about creating
            interactive, user-friendly web applications.
          </p>
        </div>
        <p>
          I'm in my 30s and I have a small (2 + 1) family. Well, 2 + 3 if you count the cats. I like reading books,
          playing board and computer games and some other 'nerdy' stuff. Recently, I've taken up 3D printing, which has
          opened up EXCITING avenues for hardware upgrades and fixes.
        </p>
        <p>
          My fascination with IT began when I got my first PC in the late 90s. I wrote my first lines of code 20 years
          ago but couldn't pursue a career in IT at that time. A few years ago, however, I realized that not trying
          would be a regret I would carry for life. Programming is more than just a job for me; it’s a passion. I thrive
          on the satisfaction of seeing my algorithms and components work seamlessly together. Although my journey
          hasn’t always been straightforward, I am committed to advancing in this industry and continually refining my
          skills.
        </p>
        <p>
          On the next page, you can check out my biggest projects that I'm hosting on this website. I’m excited to share
          my work with you!
        </p>
        <p>
          In the final section of my page, you'll find detailed information about my skills and how to get in touch with
          me. Whether you're looking for collaboration or simply want to connect, feel free to reach out! Thank you for
          stopping by! I look forward to connecting with you.
        </p>
      </div>
    </div>
  );
};

export default WelcomeMessage;
