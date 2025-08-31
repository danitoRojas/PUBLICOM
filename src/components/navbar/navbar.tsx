import Search from '../UI/shearch/shearch';
import './navbar.css';
import { useState } from 'react';
import { getPublicidades } from '../../api/publicidad/publicidad';
import { PublicidadAPIResponce } from '../../interfaces/publicidad.interface';

const Navbar = ({ onFilter }: { onFilter: (ads: PublicidadAPIResponce[]) => void }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchType, setSearchType] = useState<'title' | 'body'>('title'); // Estado para el tipo de búsqueda

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };

    const handleSearch = async (query: string) => {
        try {
            let results: PublicidadAPIResponce[] = [];
            if (searchType === 'title') {
                results = await getPublicidades(query, undefined); // Buscar por título
            } else if (searchType === 'body') {
                results = await getPublicidades(undefined, query); // Buscar por cuerpo
            }
            onFilter(results); // Pasar los resultados filtrados al componente padre
        } catch (error) {
            console.error('Error fetching publicidades:', error);
        }
    };

    const handleSearchTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSearchType(e.target.value as 'title' | 'body'); // Actualizar el tipo de búsqueda
    };

    return (
        <>
            <button className="navbar-toggle" onClick={toggleNavbar}>
                {isOpen ? 'Cerrar' : 'Filtros'}
            </button>
            <div className={`vertical-navbar ${isOpen ? 'open' : ''}`}>
                <h3>Filtros</h3>
                <div className="filter-group">
                    <label htmlFor="searchType">Buscar por:</label>
                    <select
                        id="searchType"
                        className="filter-select"
                        value={searchType}
                        onChange={handleSearchTypeChange}
                    >
                        <option value="title">Título</option>
                        <option value="body">Cuerpo</option>
                    </select>
                </div>
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
