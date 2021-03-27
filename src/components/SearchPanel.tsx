import React, { useState } from 'react';
import { SearchType } from '../models/Enums';

interface SearchPanelProps {
  onSearchCallback: (keyword: string, searchType:SearchType) => void;
}

const SearchPanel: React.FC<SearchPanelProps> = ({ onSearchCallback }) => {
  const [searchValue, setSearchValue] = useState('');
  const [searchType, setSearchType] = useState<SearchType>(SearchType.videos)

  const handleSearchValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleSearchClick = () => {
    onSearchCallback(searchValue, searchType);
  };

  const handleSearchTypeChange = (e:any) => {
    setSearchType(parseInt(e.target.value));
  }

  const handleKeyPress = (e: any) => {
    if (e.charCode == 13)
      handleSearchClick();
  };

  return (
    <div id="search">
      <div className="input-group mb-3">
        <div id="search-type">
          <select className="form-select" onChange={handleSearchTypeChange} value={searchType}>
            <option value="1">Търсене на видеа</option>
            <option value="2">Търсене на плейлисти</option>
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
