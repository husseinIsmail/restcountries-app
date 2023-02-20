import './Search.css';

interface SearchProps {
  searchInput: string,
  onChange: React.ChangeEventHandler<HTMLInputElement>
}

const Search = ({searchInput, onChange}: SearchProps): JSX.Element => {
  return (
    <div className='search'>
      <span className='search-icon'><i className="fa-solid fa-magnifying-glass"></i></span>
      <input className='search-input' type='text' placeholder='Search for a country...' value={searchInput} onChange={onChange} />
    </div>
  )
};

export default Search;
