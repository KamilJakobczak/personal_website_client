interface UserBookDetailsInterface {
  details: any;
}

const UserBookDetails: React.FC<UserBookDetailsInterface> = ({ details }) => {
  console.log(details);
  return <div></div>;
};

export default UserBookDetails;
