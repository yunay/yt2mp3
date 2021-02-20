import React, { useState } from 'react';

interface SearchProps {
  onSearchCallback: (keyword: string) => void;
}

const Search: React.FC<SearchProps> = ({ onSearchCallback }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearchValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleSearchClick = () => {
    onSearchCallback(searchValue);
  };

  return (
    <div id="search">
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          value={searchValue}
          onChange={handleSearchValueChange}
        />
        <div className="input-group-append">
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={handleSearchClick}
          >
            🔎 Търси
          </button>
        </div>
      </div>
    </div>
  );
};

export default Search;
