import Search from '../UI/shearch/shearch';
import './navbar.css';
import { useState } from 'react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };

    const handleSearch = (query: string) => {
        console.log('Search query:', query); // Replace with actual search logic
    };

    return (
        <>
            <button className="navbar-toggle" onClick={toggleNavbar}>
                {isOpen ? 'Cerrar' : 'Filtros'}
            </button>
            <div className={`vertical-navbar ${isOpen ? 'open' : ''}`}>
                <h3>Filtros</h3>
                <Search onSearch={handleSearch} />
                <div className="filter-group">
                    <select className="filter-select">
                        <option value="">Tipo de publicidad</option>
                        <option value="tipo1">Tipo 1</option>
                        <option value="tipo2">Tipo 2</option>
                        <option value="tipo3">Tipo 3</option>
                    </select>
                </div>
            </div>
        </>
    );
};

export default Navbar;
