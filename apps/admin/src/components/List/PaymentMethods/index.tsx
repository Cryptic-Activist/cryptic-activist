import { FC } from "react";
import { FaChevronDown } from "react-icons/fa";

import type { ListProps } from "./types";

import Item from "./Item";
import styles from "./styles.module.scss";

const PaymentMethodCategories: FC<ListProps> = ({ items }) => {
  return (
    <div className={styles.container}>
      <header className={styles.listHeader}>
        <button className={styles.listHeaderItem}>
          <span>Name</span>
          <span>
            <FaChevronDown />
          </span>
        </button>
        <button className={styles.listHeaderItem}>
          <span>Created At</span>
          <span>
            <FaChevronDown />
          </span>
        </button>
        <button className={styles.listHeaderItem}>
          <span>Updated At</span>
          <span>
            <FaChevronDown />
          </span>
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

export default PaymentMethodCategories;
