import { Dropdown, DropdownButton } from 'react-bootstrap';
import './RegionFilter.css';

interface RegionFilterProps {
  onSelectRegion: Function
};

const RegionFilter = ({ onSelectRegion }: RegionFilterProps): JSX.Element => {

  const filterByRegion = (e: any): void => {
    onSelectRegion(e);
  };

  return (
    <DropdownButton
      className='region-dropdown'
      title="Filter by Region"
      onSelect={filterByRegion}
    >
      <Dropdown.Item className='region-dropdown-item' eventKey='Africa'>Africa</Dropdown.Item>
      <Dropdown.Item className='region-dropdown-item' eventKey='Americas'>Americas</Dropdown.Item>
      <Dropdown.Item className='region-dropdown-item' eventKey='Asia'>Asia</Dropdown.Item>
      <Dropdown.Item className='region-dropdown-item' eventKey='Europe'>Europe</Dropdown.Item>
      <Dropdown.Item className='region-dropdown-item' eventKey='Oceania'>Oceania</Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item className='region-dropdown-item' eventKey='All'>All</Dropdown.Item>
    </DropdownButton>
  );
}

export default RegionFilter;