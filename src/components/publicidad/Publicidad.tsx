import Card from "../UI/cards/card";
import { useState, useEffect } from "react";
import styles from "./Publicidad.module.css";
import IconButtons from "../UI/buttons/iconButtons";
import { getPublicidades } from "../../api/publicidad/publicidad";
import { PublicidadAPIResponce } from "../../interfaces/publicidad.interface";
import { fetchUsers } from "../../api/users/user";
import { fetchComentarios } from "../../api/comentarios/comentarios";
import { ComentarioAPIResponse } from "../../interfaces/comentarios";

import { Chip } from "../UI/chips/chips";
import { UserAPIResponse } from "../../interfaces/user";

function Publicidad() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [ads, setAds] = useState<PublicidadAPIResponce[]>([]);
  const [selectedAd, setSelectedAd] = useState<PublicidadAPIResponce | null>(
    null
  );
  const [comments, setComments] = useState<ComentarioAPIResponse[]>([]);
  const [users, setUsers] = useState<UserAPIResponse[]>([]);

  useEffect(() => {
    getPublicidades().then(setAds);
    fetchUsers().then(setUsers);
  }, []);

  const handleCardClick = async (ad: PublicidadAPIResponce) => {
    setSelectedAd(ad);
    setIsDrawerOpen(true);
    const comentarios = await fetchComentarios(ad.id);
    setComments(comentarios);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  return (
    <div className={styles.layoutContainer}>
      <div className={styles.mainContent}>
        {isDrawerOpen && (
          <div className={styles.overlay} onClick={closeDrawer} />
        )}

        <div className={styles.gridContainer}>
          {ads.map((ad) => {
            const user = users.find((u) => u.id === ad.userId);
            return (
              <div
                key={ad.id}
                className={styles.cardContainer}
                style={{ minWidth: "200px" }} /* Asegurar un ancho mínimo para las tarjetas */
                onClick={() => handleCardClick(ad)}
              >
                <Card
                  image={
                    "https://2.bp.blogspot.com/_EZ16vWYvHHg/S79tDYAX1bI/AAAAAAAAJ2w/Do2kAV8FCIE/s1600/www.BancodeImagenesGratuitas.com-FAP-17.jpg"
                  }
                >
                  <div className={styles.cardContent}>
                    {/* Chips de usuario en la tarjeta principal */}
                    {user && (
                      <div
                        style={{
                          display: "flex",
                          gap: "1rem",
                          marginBottom: "0.5rem",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem",
                          }}
                        >
                        <span
                            style={{
                              color: "#555",
                            }}
                          >
                          </span>
                          <Chip label={user.name} />
                        </div>

                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem",
                          }}
                        >
                          <span
                            style={{
                              color: "#555",
                            }}
                          >
                          </span>
                          <Chip label={user.email} />
                        </div>
                      </div>
                    )}
                    <h4 className={styles.cardTitle}>{ad.title}</h4>
                    <p
                      className={styles.cardText}
                      style={{
                        fontSize: "0.85rem",
                        maxHeight: "2.8em",
                        overflow: "hidden",
                        marginBottom: "0.5rem",
                      }}
                    >
                      {ad.body.length > 70
                        ? ad.body.slice(0, 67) + "..."
                        : ad.body}
                    </p>
                  </div>
                  <div
                    style={{
                      marginTop: "auto",
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

        <div
          className={`${styles.drawer} ${
            isDrawerOpen ? styles.drawerOpen : ""
          }`}
          style={{
            maxWidth: "400px", // Limit drawer width on larger screens
            width: "100%", // Full width for smaller screens
          }}
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
                  src={
                    "https://2.bp.blogspot.com/_EZ16vWYvHHg/S79tDYAX1bI/AAAAAAAAJ2w/Do2kAV8FCIE/s1600/www.BancodeImagenesGratuitas.com-FAP-17.jpg"
                  }
                  alt={selectedAd.title}
                  className={styles.drawerImage}
                />
                <p className={styles.drawerText}>{selectedAd.body}</p>

                {/* Mostrar datos importantes del usuario en chips */}
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
