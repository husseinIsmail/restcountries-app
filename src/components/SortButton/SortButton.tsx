import { MouseEventHandler } from 'react';
import { Button } from 'react-bootstrap';
import './SortButton.css';

interface SortButtonProps {
  onClick: MouseEventHandler<HTMLButtonElement>
};

const SortButton = ({ onClick }: SortButtonProps): JSX.Element => {

  return (
    <Button className='sort-btn' variant="secondary" onClick={onClick}>Sort by Population</Button>
  );
}

export default SortButton;