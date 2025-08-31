import React from "react";
import styles from "./modal.module.css";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ open, onClose, children }) => {
  return (
    <>
      {open && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.6)", // Darken the backdrop
            zIndex: 999,
            display: "flex",
            alignItems: "center", // Center modal vertically
            justifyContent: "center", // Center modal horizontally
          }}
          onClick={onClose} // Close modal when clicking on the backdrop
        />
      )}
      <div
        className={styles.modal}
        style={{
          width: open ? "600px" : "0",
          boxShadow: open ? "0 4px 20px rgba(0,0,0,0.3)" : "none",
          padding: open ? "2rem" : "0",
          borderRadius: "12px", // Soften the corners
        }}
        role="dialog"
        aria-modal="true"
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
    </>
  );
};

export default Modal;
