import LikeIcon from '../../../assets/icon/like';
import { IconMessage } from '../../../assets/icon/message';
import IconShare from '../../../assets/icon/share';
import styles from './iconButton.module.css';

const IconButtons = () => {
  return (
    <div className={styles.iconButtons}>
      <button className={styles.iconButton}>
        <LikeIcon /> 
      </button>
      <button className={styles.iconButton}>
        <IconMessage />
      </button>
      <button className={styles.iconButton}>
        <IconShare />
      </button>
    </div>
  );
};

export default IconButtons;
