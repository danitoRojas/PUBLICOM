import Search from "../UI/shearch/shearch";
import "./navbar.css";
import { useState, useEffect } from "react";
import {
  getPublicidades,
  getUserByUsername,
} from "../../api/publicidad/publicidad";
import { PublicidadAPIResponce } from "../../interfaces/publicidad.interface";

const Navbar = ({
  onFilter,
}: {
  onFilter: (ads: PublicidadAPIResponce[]) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchType, setSearchType] = useState<"title" | "body" | "username">(
    "title"
  );
  const [username, setUsername] = useState<string>("");

  const toggleNavbar = () => setIsOpen(!isOpen);

  const handleSearch = async (query: string) => {
    try {
      let results: PublicidadAPIResponce[] = [];

      if (searchType === "title") {
        results = await getPublicidades(query, undefined, undefined);
      } else if (searchType === "body") {
        results = await getPublicidades(undefined, query, undefined);
      } else if (searchType === "username" && username.trim()) {
        const user = await getUserByUsername(username.trim());
        if (user) {
          results = await getPublicidades(undefined, undefined, user.id);
        } else {
          results = [];
        }
      }

      onFilter(results);
    } catch (error) {
      console.error("Error fetching publicidades:", error);
    }
  };

  const handleSearchTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchType(e.target.value as "title" | "body" | "username");
    setUsername("");
  };

  useEffect(() => {
    if (searchType === "username" && username.trim()) {
      handleSearch(username);
    }
  }, [username, searchType]);

  return (
    <>
      <button className="navbar-toggle" onClick={toggleNavbar}>
        {isOpen ? "Cerrar" : "Filtros"}
      </button>
      <div className={`vertical-navbar ${isOpen ? "open" : ""}`}>
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
            <option value="username">Nombre de Usuario</option>
          </select>
        </div>

        {searchType === "username" && (
          <Search onSearch={(query) => setUsername(query)} />
        )}

        {(searchType === "title" || searchType === "body") && (
          <Search onSearch={handleSearch} />
        )}
      </div>
    </>
  );
};

export default Navbar;
