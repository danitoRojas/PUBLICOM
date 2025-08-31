import React from "react";
import styles from "./card.module.css";

interface CardProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  image?: string; 
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, style, image, className }) => (
  <div className={`${styles.card} ${className || ""}`} style={style}>
    {image && (
      <img
        src={image}
        alt="Card"
        className={styles.cardImage}
      />
    )}
    <div className={styles.cardScrollableContent}>
      {children}
    </div>
  </div>
);

export default Card;