import styles from './index.module.scss';

const Header = () => {
  return (
    <div className={styles.header}>
      <button className={`${styles.columnButton} ${styles.buyFrom}`}>
        Buy from
      </button>
      <button className={`${styles.columnButton} ${styles.payWith}`}>
        Pay with
      </button>
      <button className={`${styles.columnButton} ${styles.avgTradeSpeed}`}>
        Avg. trade speed
      </button>
      <button className={`${styles.columnButton} ${styles.rate}`}>Rate</button>
    </div>
  );
};

export default Header;
