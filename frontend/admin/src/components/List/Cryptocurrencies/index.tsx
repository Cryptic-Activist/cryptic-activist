import { FC } from "react";

import type { ListProps } from "./types";

import Item from "./Item";
import styles from "./styles.module.scss";

const Cryptocurrencies: FC<ListProps> = ({ items }) => {
  return (
    <div className={styles.container}>
      <header className={styles.listHeader}>
        <button className={styles.listHeaderItem}>
          <span>CoinGecko Id</span>
        </button>
        <button className={styles.listHeaderItem}>
          <span>Symbol</span>
        </button>
        <button className={styles.listHeaderItem}>
          <span>Name</span>
        </button>
        <button className={styles.listHeaderItem}>
          <span>Created At</span>
        </button>
        <button className={styles.listHeaderItem}>
          <span>Updated At</span>
        </button>
        <button className={`${styles.listHeaderItem}`}>
          <span>Actions</span>
        </button>
      </header>
      <ul className={styles.list}>
        {items.map((item) => (
          <Item key={item.id} item={item} />
        ))}
      </ul>
    </div>
  );
};

export default Cryptocurrencies;
