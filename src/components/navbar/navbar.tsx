import Search from "../UI/shearch/shearch";
import "./navbar.css";
import { useState, useEffect, useCallback } from "react";
import {
  getPublicaciones,
  getUserByUsername,
} from "../../api/publicacion/publicicion";
import { PublicacionesAPIResponce } from "../../interfaces/publicacion.interface";

const Navbar = ({
  onFilter,
}: {
  onFilter: (ads: PublicacionesAPIResponce[]) => void;
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const [searchType, setSearchType] = useState<"title" | "body" | "username">(
    "title"
  );
  const [username, setUsername] = useState<string>("");

  const handleSearch = useCallback(async (query: string) => {
    try {
      let results: PublicacionesAPIResponce[] = [];

      if (searchType === "title") {
        results = await getPublicaciones(query, undefined, undefined);
      } else if (searchType === "body") {
        results = await getPublicaciones(undefined, query, undefined);
      } else if (searchType === "username" && username.trim()) {
        const user = await getUserByUsername(username.trim());
        if (user) {
          results = await getPublicaciones(undefined, undefined, user.id);
        } else {
          results = [];
        }
      }

      onFilter(results);
    } catch (error) {
      console.error("Error fetching publicacion:", error);
    }
  }, [searchType, username, onFilter]);

  const handleSearchTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchType(e.target.value as "title" | "body" | "username");
    setUsername("");
  };

  useEffect(() => {
    if (searchType === "username" && username.trim()) {
      handleSearch(username);
    }
  }, [username, searchType, handleSearch]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div
        className={`vertical-navbar open`}
        style={isMobile ? { transform: "translateX(0)" } : {}}
      >
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
            <option value="body">Contenido</option>
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
