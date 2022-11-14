const AddPublisher: React.FC = () => {
  const handleSubmit = () => {
    console.log('submit');
  };
  return (
    <div className='add_publisher'>
      <form className='add_publisher__form' action=''>
        <div className='add_publisher__form_element'>
          <label htmlFor='name'>name:</label>
          <input type='text' id='name' autoComplete='off' required />
        </div>
        <div className='add_publisher__form_element'>
          <label htmlFor='website'>website:</label>
          <input type='text' id='website' autoComplete='off' required />
        </div>
        <div className='add_publisher__form_element__address'>
          <p>address</p>
          <div className='address_item'>
            <label htmlFor='country'>country:</label>
            <input type='text' id='country' autoComplete='off' required />
          </div>
          <div className='address_item'>
            <label htmlFor='zipCode'>zipCode:</label>
            <input type='text' id='zipCode' autoComplete='off' required />
          </div>
          <div className='address_item'>
            <label htmlFor='city'>city:</label>
            <input type='text' id='city' autoComplete='off' required />
          </div>
          <div className='address_item'>
            <label htmlFor='street'>street:</label>
            <input type='text' id='street' autoComplete='off' required />
          </div>
          <div className='address_item'>
            <label htmlFor='buildingNr'>buildingNr:</label>
            <input type='text' id='buildingNr' autoComplete='off' required />
          </div>
          <div className='address_item'>
            <label htmlFor='placeNr'>placeNr:</label>
            <input type='text' id='placeNr' autoComplete='off' required />
          </div>
        </div>
        <div className='add_publisher__form_element__button'>
          <button className='collection_button' onClick={handleSubmit}>
            Add Publisher
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPublisher;
