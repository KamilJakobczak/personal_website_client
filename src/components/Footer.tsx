import LanguageChange from './Projects/book_collection/components/general-purpose/LanguageChange';

const Footer: React.FC = () => {
  return (
    <footer className='footer'>
      <div className='footer__wrapper'>
        <span>&copy;Kamil Jakóbczak 2024</span>
        <a href='https://icons8.com/'>Icons by ICONS8</a>
      </div>
      <LanguageChange />
    </footer>
  );
};

export default Footer;
