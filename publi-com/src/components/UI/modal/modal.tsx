import React from "react";
import styles from "./modal.module.css";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ open, onClose, children }) => {
  return (
    <div
      className={styles.modal}
      style={{
        width: open ? "600px" : "0",
        boxShadow: open ? "0 2px 16px rgba(0,0,0,0.2)" : "none",
        padding: open ? "2rem" : "0",
      }}
    >
      {open && (
        <>
          <button
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Cerrar"
          >
            ×
          </button>
          {children}
        </>
      )}
    </div>
  );
};

export default Modal;
