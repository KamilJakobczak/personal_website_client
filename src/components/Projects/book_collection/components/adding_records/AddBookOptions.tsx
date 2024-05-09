import Button from '../general-purpose/Button';

const AddBookOptions: React.FC = () => {
  return (
    <div className='bookCollection__addBook__options'>
      <Button
        // handleClick={handleBookButtonClick}
        className='bookCollection__addBook__options_button'
        linkPath='/apps/collection/add/book/upload'
        text='upload an epub file'
      />
      <Button
        // handleClick={handleBookButtonClick}
        className='bookCollection__addBook__options_button'
        linkPath='/apps/collection/add/book/manual'
        text='input info by yourself'
      />
    </div>
  );
};

export default AddBookOptions;
