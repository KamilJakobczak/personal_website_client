import { useActions } from '../hooks/useActions';

interface ActionBarProps {
  id: string;
}
const ActionBar: React.FC<ActionBarProps> = ({ id }) => {
  const { moveCell, deleteCell } = useActions();
  return (
    <div className='action_bar'>
      <button className='action_bar__button' onClick={() => moveCell(id, 'up')}>
        <span className='icon'>
          <i className='fas fa-arrow-up'></i>
        </span>
      </button>
      <button
        className='action_bar__button'
        onClick={() => moveCell(id, 'down')}
      >
        <span className='icon'>
          <i className='fas fa-arrow-down'></i>
        </span>
      </button>
      <button className='action_bar__button' onClick={() => deleteCell(id)}>
        <span className='icon'>
          <i className='fas fa-times'></i>
        </span>
      </button>
    </div>
  );
};

export default ActionBar;
