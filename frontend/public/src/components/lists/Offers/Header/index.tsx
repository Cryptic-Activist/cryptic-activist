import styles from './index.module.scss';

const Header = () => {
  return (
    <div className={styles.header}>
      <button className={styles.columnButton}>Buy from</button>
      <button className={styles.columnButton}>Pay with</button>
      <button className={styles.columnButton}>Avg. trade speed</button>
      <button className={styles.columnButton}>Rate</button>
    </div>
  );
};

export default Header;
