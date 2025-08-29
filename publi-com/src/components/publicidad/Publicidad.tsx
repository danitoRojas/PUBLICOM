import Card from "../UI/cards/card";
import { useState, useEffect } from "react";
import styles from "./Publicidad.module.css";
import IconButtons from "../UI/buttons/iconButtons";
import { getPublicidades } from "../../api/publicidad/publicidad";
import { PublicidadAPIResponce } from "../../interfaces/publicidad.interface";

function Publicidad() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [ads, setAds] = useState<PublicidadAPIResponce[]>([]);
  const [selectedAd, setSelectedAd] = useState<PublicidadAPIResponce | null>(null);
  const [comments] = useState<string[]>(
    [
      "¡Excelente espacio para anunciar!",
      "Me gustaría ver más productos aquí.",
      "Muy útil para negocios locales."
    ]
  );

  useEffect(() => {
    getPublicidades().then(setAds);
  }, []);

  const handleCardClick = (ad: PublicidadAPIResponce) => {
    setSelectedAd(ad);
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  return (
    <>
      {isDrawerOpen && (
        <div className={styles.overlay} onClick={closeDrawer} />
      )}

      <div className={styles.gridContainer}>
        {ads.map((ad) => (
          <div
            key={ad.id}
            className={styles.cardContainer}
            onClick={() => handleCardClick(ad)}
          >
            <Card
              image={
                "https://2.bp.blogspot.com/_EZ16vWYvHHg/S79tDYAX1bI/AAAAAAAAJ2w/Do2kAV8FCIE/s1600/www.BancodeImagenesGratuitas.com-FAP-17.jpg"
              }
            >
              <div className={styles.cardContent}>
                <h4
                  className={styles.cardTitle}
                >
                  {ad.title}
                </h4>
                <p
                  className={styles.cardText}
                  style={{ fontSize: "0.85rem", maxHeight: "2.8em", overflow: "hidden", marginBottom: "0.5rem" }}
                >
                  {ad.body.length > 70 ? ad.body.slice(0, 67) + "..." : ad.body}
                </p>
              </div>
              <div style={{
                marginTop: "auto",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between"
              }}>
                <div className={styles.buttonContainer}>
                  <IconButtons />
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>

      <div className={`${styles.drawer} ${isDrawerOpen ? styles.drawerOpen : ''}`}>
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

              <div className={styles.commentsList}>
                {comments.length === 0 ? (
                  <p className={styles.noComments}>No hay comentarios aún.</p>
                ) : (
                  comments.map((comment, index) => (
                    <div key={index} className={styles.commentCard}>
                      <div className={styles.commentText}>{comment}</div>
                      <div className={styles.commentMeta}>
                        <span className={styles.commentDate}>
                          {new Date().toLocaleDateString()}
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
    </>
  );
}



export default Publicidad;
