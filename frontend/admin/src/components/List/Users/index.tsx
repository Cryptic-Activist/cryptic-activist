import { FC } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

import type { ListProps } from "./types";

import styles from "./styles.module.scss";
import Item from "./Item";

const Users: FC<ListProps> = ({ items }) => {
  return (
    <div className={styles.container}>
      <header className={styles.listHeader}>
        <button className={styles.listHeaderItem}>
          <span>First Name</span>
          <span>
            <FaChevronDown />
          </span>
        </button>
        <button className={styles.listHeaderItem}>
          <span>Last Name</span>
          <span>
            <FaChevronDown />
          </span>
        </button>
        <button className={styles.listHeaderItem}>
          <span>Username</span>
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

export default Users;
