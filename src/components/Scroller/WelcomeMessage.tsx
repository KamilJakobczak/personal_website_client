import my_face from '../../images/my_face.jpg';

const WelcomeMessage: React.FC = () => {
  return (
    <div className='scroller__welcome_message'>
      <div className='scroller__welcome_message_container'>
        <div>
          <div className='image_container'>
            <img src={my_face} alt="jamar's face" />
          </div>
          <p>
            I'm so happy that you decided to visit my page! I am a homegrown
            front-end developer, using mostly React, but not exclusively.
          </p>
        </div>

        <p>
          I'm passionate about programming and I want to go as far as possible
          in this industry. For some reasons I haven't been able to pursue this
          goal in the past but here I am now and I really enjoy what I'm doing!
        </p>
        <p>
          I'm hosting some of my projects on this page. Currently there are two
          of them: coding playground and book collection. You can check them out
          in the next section.
        </p>
        <p>
          Last section provides information about my skills and contact details.
        </p>
      </div>
    </div>
  );
};

export default WelcomeMessage;
