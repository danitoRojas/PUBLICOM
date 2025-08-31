import React from "react";
import styles from "./chip.module.css";

type ChipProps = {
  label: string;
  onClick?: () => void;
  className?: string;
  chip?: React.ReactNode;
};


export const Chip: React.FC<ChipProps> = ({
  label,
  onClick,
  className,
  chip,
}) => (
  <div
    className={`${styles.chip} ${className ?? ""}`}
    onClick={onClick}
  >
    {chip}
    <span className={styles.label}>{label}</span>
  </div>
);

