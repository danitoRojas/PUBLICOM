import React from "react";
import styles from "./chip.module.css";

type ChipProps = {
  label: string;
  onClick?: () => void;
  className?: string;
};

export const Chip: React.FC<ChipProps> = ({
  label,
  onClick,
  className,
}) => (
  <div
    className={`${styles.chip} ${className ?? ""}`}
    onClick={onClick}
  >
    <span>{label}</span>
  </div>
);

