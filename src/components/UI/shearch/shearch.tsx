import React, { useState } from 'react';
import './shearch.css';

const Search = ({ onSearch }: { onSearch: (query: string) => void }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value; // Permitir espacios sin recortes
    setQuery(value);
    onSearch(value.trim()); // Recortar espacios en blanco antes de buscar
  };

  return (
    <div className="search-container">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="🔍 Buscar anuncios..."
        className="search-input"
      />
    </div>
  );
};

export default Search;
