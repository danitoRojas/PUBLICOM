import styles from "./pagination.module.css";

const Pagination = ({
  currentPage,
  totalPages,
  onNext,
  onPrev,
}: {
  currentPage: number;
  totalPages: number;
  onNext: () => void;
  onPrev: () => void;
}) => {
  return (
    <div className={styles.pagination}>
      <button
        className={styles.paginationButton}
        onClick={onPrev}
        disabled={currentPage === 1}
      >
        Anterior
      </button>
      <span className={styles.pageInfo}>
        Página {currentPage} de {totalPages}
      </span>
      <button
        className={styles.paginationButton}
        onClick={onNext}
        disabled={currentPage === totalPages}
      >
        Siguiente
      </button>
    </div>
  );
};

export default Pagination;
