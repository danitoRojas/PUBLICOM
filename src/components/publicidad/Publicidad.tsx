import Card from "../UI/cards/card";
import { useState, useEffect, useCallback } from "react";
import styles from "./Publicidad.module.css";
import IconButtons from "../UI/buttons/iconButtons";
import { getPublicidades } from "../../api/publicidad/publicidad";
import { PublicidadAPIResponse } from "../../interfaces/publicidad.interface";
import { fetchUsers } from "../../api/users/user";
import { fetchComentarios } from "../../api/comentarios/comentarios";
import { ComentarioAPIResponse } from "../../interfaces/comentarios";
import { Chip } from "../UI/chips/chips";
import { UserAPIResponse } from "../../interfaces/user";
import Navbar from "../navbar/navbar";

function Publicidad() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [ads, setAds] = useState<PublicidadAPIResponse[]>([]);
  const [filteredAds, setFilteredAds] = useState<PublicidadAPIResponse[]>([]);
  const [selectedAd, setSelectedAd] = useState<PublicidadAPIResponse | null>(
    null
  );
  const [comments, setComments] = useState<ComentarioAPIResponse[]>([]);
  const [users, setUsers] = useState<UserAPIResponse[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 4;

  useEffect(() => {
    getPublicidades().then((data) => {
      setAds(data);
      setFilteredAds(data);
    });
    fetchUsers().then(setUsers);
  }, []);

  const handleFilter = useCallback((filtered: PublicidadAPIResponse[]) => {
    setFilteredAds(filtered);
    setCurrentPage(1); 
  }, []);

  const totalPages = Math.ceil(filteredAds.length / itemsPerPage);
  const paginatedAds = filteredAds.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleCardClick = useCallback(async (ad: PublicidadAPIResponse) => {
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
                        <Chip label={user.username} />
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

        <div className={styles.pagination}>
          <button
            className={styles.paginationButton}
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            Anterior
          </button>
          <span className={styles.pageInfo}>
            Página {currentPage} de {totalPages}
          </span>
          <button
            className={styles.paginationButton}
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Siguiente
          </button>
        </div>

        <div
          className={`${styles.drawer} ${
            isDrawerOpen ? styles.drawerOpen : ""
          }`}
          style={{ maxWidth: "400px", width: "100%" }}
        >
          {selectedAd && (
            <>
              <div className={styles.drawerHeader}>
                <h3 className={styles.drawerTitle}>{selectedAd.title}</h3>
                <button className={styles.closeButton} onClick={closeDrawer}>
                  ×
                </button>
              </div>

              <div className={styles.drawerContent}>
                <img
                  src="https://2.bp.blogspot.com/_EZ16vWYvHHg/S79tDYAX1bI/AAAAAAAAJ2w/Do2kAV8FCIE/s1600/www.BancodeImagenesGratuitas.com-FAP-17.jpg"
                  alt={selectedAd.title}
                  className={styles.drawerImage}
                />
                <p className={styles.drawerText}>{selectedAd.body}</p>

                {(() => {
                  const user = users.find((u) => u.id === selectedAd.userId);
                  if (!user) return null;
                  return (
                    <div
                      style={{
                        display: "flex",
                        gap: "0.5rem",
                        flexWrap: "wrap",
                        marginBottom: "1rem",
                      }}
                    >
                      <Chip label={`Nombre: ${user.name}`} />
                      <Chip label={`Email: ${user.email}`} />
                      <Chip label={`Tel: ${user.phone}`} />
                      <Chip label={`Empresa: ${user.company.name}`} />
                    </div>
                  );
                })()}

                <div className={styles.commentsList}>
                  {comments.length === 0 ? (
                    <p className={styles.noComments}>No hay comentarios aún.</p>
                  ) : (
                    comments.map((comment) => (
                      <div key={comment.id} className={styles.commentCard}>
                        <div className={styles.commentText}>{comment.body}</div>
                        <div className={styles.commentMeta}>
                          <span className={styles.commentDate}>
                            {comment.email}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Publicidad;
