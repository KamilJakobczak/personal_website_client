import { useActions } from '../hooks/useActions';

interface AddCellProps {
  previousCellId: string | null;
  forceVisible?: boolean;
}
const AddCell: React.FC<AddCellProps> = ({ forceVisible, previousCellId }) => {
  const { insertCellAfter } = useActions();
  return (
    <div className={`add_cell ${forceVisible && 'force-visible'}`}>
      <div className='add_cell__add_buttons'>
        <button
          className='add_cell__add_buttons__button'
          onClick={() => insertCellAfter(previousCellId, 'code')}
        >
          <span className='add_cell__add_buttons__icon'>
            <i className='fas fa-plus'></i>
          </span>
          <span>Code</span>
        </button>
        <button
          className='add_cell__add_buttons__button'
          onClick={() => insertCellAfter(previousCellId, 'text')}
        >
          <span className='add_cell__add_buttons__icon'>
            <i className='fas fa-plus'></i>
          </span>
          <span>Text</span>
        </button>
      </div>
      <div className='divider'></div>
    </div>
  );
};
export default AddCell;
