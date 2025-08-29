import React from "react";
import styles from "./chip.module.css";

type ChipProps = {
  label: string;
//   icon?: React.ReactElement<SvgIconProps>;
  onClick?: () => void;
  className?: string;
};

export const Chip: React.FC<ChipProps> = ({
  label,
//   icon,
  onClick,
  className,
}) => (
  <div
    className={`${styles.chip} ${className ?? ""}`}
    onClick={onClick}
    // estilos ahora vienen del CSS
  >
    {/* {icon && <span className={styles.icon}>{icon}</span>} */}
    <span>{label}</span>
  </div>
);

