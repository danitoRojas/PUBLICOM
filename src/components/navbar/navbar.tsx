import './navbar.css';
import { useState } from 'react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <button className="navbar-toggle" onClick={toggleNavbar}>
                {isOpen ? 'Cerrar' : 'Filtros'}
            </button>
            <div className={`vertical-navbar ${isOpen ? 'open' : ''}`}>
                <h3>Filtros</h3>
                <div className="filter-group">
                    <input
                        type="text"
                        placeholder="Buscar por título..."
                        className="filter-input"
                    />
                </div>
                <div className="filter-group">
                    <select className="filter-select">
                        <option value="">Tipo de publicidad</option>
                        <option value="tipo1">Tipo 1</option>
                        <option value="tipo2">Tipo 2</option>
                        <option value="tipo3">Tipo 3</option>
                    </select>
                </div>
                <div className="filter-group">
                    <input
                        type="date"
                        className="filter-date"
                    />
                </div>
                <ul>
                    <li><button>Filtro 1</button></li>
                    <li><button>Filtro 2</button></li>
                    <li><button>Filtro 3</button></li>
                    <li><button>Filtro 4</button></li>
                </ul>
            </div>
        </>
    );
};

export default Navbar;
