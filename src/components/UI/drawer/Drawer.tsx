import React from "react";
import styles from "./drawer.module.css";
import { Chip } from "../chips/chips";
import { ComentarioAPIResponse } from "../../../interfaces/comentarios";
import { UserAPIResponse } from "../../../interfaces/user";
import { PublicacionesAPIResponce } from "../../../interfaces/publicacion.interface";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedAd: PublicacionesAPIResponce | null;
  users: UserAPIResponse[];
  comments: ComentarioAPIResponse[];
}

const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  selectedAd,
  users,
  comments,
}) => {
  if (!selectedAd) return null;

  const user = users.find((u) => u.id === selectedAd.userId);

  return (
    <div
      className={`${styles.drawer} ${isOpen ? styles.drawerOpen : ""}`}
      style={{
        maxWidth: "550px",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        opacity: isOpen ? 1 : 0,
        transition: "opacity 0.4s ease",
      }}
    >
      <div className={styles.drawerHeader}>
        <h3 className={styles.drawerTitle}>{selectedAd.title}</h3>
        <button className={styles.closeButton} onClick={onClose}>
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

        {user && (
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
        )}

        <h4 style={{ marginBottom: "1rem", color: "#1976d2" }}>Comentarios</h4>
        <div className={styles.commentsList}>
          {comments.length === 0 ? (
            <p className={styles.noComments}>No hay comentarios aún.</p>
          ) : (
            comments.map((comment) => (
              <div key={comment.id} className={styles.commentCard}>
                <div className={styles.commentText}>{comment.body}</div>
                <div className={styles.commentMeta}>
                  <span className={styles.commentDate}>{comment.email}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Drawer;
