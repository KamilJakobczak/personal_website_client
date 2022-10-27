interface BookProps {
  bookId: string;
}

const Book: React.FC<BookProps> = ({ bookId }) => {
  return (
    <div className='singleBookPage'>
      <div className='cover'>
        <img src={`http://localhost:4000/get/cover/${bookId}`} alt='' />
      </div>
      {/* <BookData bookId={bookId} /> */}
      <div className='bookQuotes'></div>
    </div>
  );
};

export default Book;
