import Card from "../UI/cards/card";
import { useState, useEffect, useCallback } from "react";
import styles from "./Publicidad.module.css";
import IconButtons from "../UI/buttons/iconButtons";
import { getPublicaciones } from "../../api/publicacion/publicicion";
import { fetchUsers } from "../../api/users/user";
import { fetchComentarios } from "../../api/comentarios/comentarios";
import { ComentarioAPIResponse } from "../../interfaces/comentarios";
import { Chip } from "../UI/chips/chips";
import { UserAPIResponse } from "../../interfaces/user";
import Navbar from "../navbar/navbar";
import { PublicacionesAPIResponce } from "../../interfaces/publicacion.interface";
import Pagination from "../UI/pagination/pagination";
import Drawer from "../UI/drawer/Drawer";
import IconUser from "../../assets/icon/user";

function Publicacion() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [filteredAds, setFilteredAds] = useState<PublicacionesAPIResponce[]>([]);
  const [selectedAd, setSelectedAd] = useState<PublicacionesAPIResponce | null>(
    null
  );
  const [comments, setComments] = useState<ComentarioAPIResponse[]>([]);
  const [users, setUsers] = useState<UserAPIResponse[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 6;

  useEffect(() => {
    getPublicaciones().then((data) => {
      setFilteredAds(data);
    });
    fetchUsers().then(setUsers);
  }, []);

  const handleFilter = useCallback((filtered: PublicacionesAPIResponce[]) => {
    setFilteredAds(filtered);
    setCurrentPage(1); 
  }, []);

  const totalPages = Math.ceil(filteredAds.length / itemsPerPage);
  const paginatedAds = filteredAds.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleCardClick = useCallback(async (ad: PublicacionesAPIResponce) => {
    setSelectedAd(ad);
    setIsDrawerOpen(true);
    const comentarios = await fetchComentarios(ad.id);
    setComments(comentarios);
  }, []);

  const closeDrawer = () => setIsDrawerOpen(false);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <div className={styles.layoutContainer}>
      <Navbar onFilter={handleFilter} />

      <div className={styles.mainContent}>
        {isDrawerOpen && (
          <div className={styles.overlay} onClick={closeDrawer} />
        )}

        <div className={styles.gridContainer}>
          {paginatedAds.map((ad) => {
            const user = users.find((u) => u.id === ad.userId);
            return (
              <div
                key={ad.id}
                className={styles.cardContainer}
                style={{ minWidth: "200px" }}
                onClick={() => handleCardClick(ad)}
              >
                <Card image="https://2.bp.blogspot.com/_EZ16vWYvHHg/S79tDYAX1bI/AAAAAAAAJ2w/Do2kAV8FCIE/s1600/www.BancodeImagenesGratuitas.com-FAP-17.jpg">
                  <div className={styles.cardContent}>
                    {user && (
                      <div style={{ display: "flex", alignItems: "end" }}>
                        <Chip label={user.username} chip={<IconUser />} />
                      </div>
                    )}
                    <h4 className={styles.cardTitle}>{ad.title}</h4>
                    <p
                      className={styles.cardText}
                      style={{
                        fontSize: "0.85rem",
                        maxHeight: "3.8em",
                        overflow: "hidden",
                      }}
                    >
                      {ad.body.length > 60
                        ? ad.body.slice(0, 77) + "..."
                        : ad.body}
                    </p>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div className={styles.buttonContainer}>
                      <IconButtons />
                    </div>
                  </div>
                </Card>
              </div>
            );
          })}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onNext={handleNextPage}
          onPrev={handlePrevPage}
        />

        <Drawer
          isOpen={isDrawerOpen}
          onClose={closeDrawer}
          selectedAd={selectedAd}
          users={users}
          comments={comments}
        />
      </div>
    </div>
  );
}



export default Publicacion;
