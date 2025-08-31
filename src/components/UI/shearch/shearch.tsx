import React, { useState } from 'react';
import './shearch.css';
import IconSearch from '../../../assets/icon/search';

const Search = ({ onSearch }: { onSearch: (query: string) => void }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value; 
    setQuery(value);
    onSearch(value.trim()); 
  };

    return (
      <div className="search-container">
        <span className="search-icon" aria-hidden="true">
          <IconSearch />
        </span>
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Buscar anuncios..."
          className="search-input"
          aria-label="Buscar anuncios"
        />
      </div>
    );
};

export default Search;
