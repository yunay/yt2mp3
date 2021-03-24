import React, { useState } from 'react';

interface SearchPanelProps {
  onSearchCallback: (keyword: string) => void;
}

const SearchPanel: React.FC<SearchPanelProps> = ({ onSearchCallback }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearchValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleSearchClick = () => {
    onSearchCallback(searchValue);
  };

  const handleKeyPress = (e: any) => {
    if (e.charCode == 13)
      handleSearchClick();
  };

  return (
    <div id="search">
      <div className="input-group mb-3">
        <div id="search-type">
          <select className="form-select" id="inputGroupSelect02">
            <option value="1">Чрез ключова дума</option>
            <option value="2">Плейлиста</option>
          </select>
        </div>
        <input
          type="text"
          className="form-control"
          value={searchValue}
          onChange={handleSearchValueChange}
          onKeyPress={handleKeyPress}
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

export default SearchPanel;
