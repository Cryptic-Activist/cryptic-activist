import { FC } from "react";
import { FaTrash, FaPen } from "react-icons/fa";

import { formatDate } from "@/utils/date";

import styles from "./styles.module.scss";

import type { ItemProps } from "./types";

const Item: FC<ItemProps> = ({ item }) => {
  return (
    <li className={styles.item}>
      <div>{item.names.firstName}</div>
      <div>{item.names.lastName}</div>
      <div>{item.username}</div>
      <div>{formatDate(item.createdAt)}</div>
      <div>{formatDate(item.updatedAt)}</div>
      <div className={styles.actions}>
        <button className={styles.action}>
          <FaPen />
        </button>
        <button className={styles.action}>
          <FaTrash />
        </button>
      </div>
    </li>
  );
};

export default Item;
