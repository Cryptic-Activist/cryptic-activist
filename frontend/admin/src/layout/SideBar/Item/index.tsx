import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";

import styles from "../styles.module.scss";
import { SideBarProps } from "./types";

const Item: FC<SideBarProps> = ({ href, label }) => {
  const pathname = usePathname();
  const assignedPath = href.split("/");
  const isCurrentPage = pathname?.split("/")[1].includes(assignedPath[1]);

  return (
    <li
      className={`${styles.asideListItem} ${
        isCurrentPage ? styles.asideListItemIsCurrentPage : null
      }`}
    >
      <Link href={href}>{label}</Link>
    </li>
  );
};

export default Item;
