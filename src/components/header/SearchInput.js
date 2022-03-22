import './SearchInput.css';

const SearchInput = props => {
  return (
    <div className="input-field-icon">
      <label>
        <span className="icon small">
          <i className="bi bi-search"></i>
        </span>
        <input placeholder="Search" type="search" />
      </label>
    </div>
  );
};
export default SearchInput;
