import React, { useState } from 'react';
import './shearch.css';

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
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="9" cy="9" r="7" stroke="#1976d2" strokeWidth="2" />
            <line x1="14.2" y1="14.2" x2="18" y2="18" stroke="#1976d2" strokeWidth="2" strokeLinecap="round" />
          </svg>
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
