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
            I'm happy that you decided to visit my page! I am a homegrown front-end developer, using mostly React, but
            not exclusively.
          </p>
        </div>
        <p>
          I'm in my 30s and I have a small (2 + 1) family. Well, 2 + 3 if you count the cats. I like reading books,
          playing board games and some other 'nerdy' stuff.
        </p>
        <p>
          I'm passionate about programming and I want to go as far as possible in this industry. For some reasons I
          haven't been able to pursue this goal but here I am now and I really enjoy what I'm doing!
        </p>
        <p>
          I'm hosting some of my projects on this page. You can check them out in the next section. My next project will
          be some kind of a blog as I sometimes feel the urge of letting out my thoughts. It should be quite a learning
          process as well.
        </p>
        <p>Last section provides information about my skills and contact details.</p>
      </div>
    </div>
  );
};

export default WelcomeMessage;
