"use client";
import { redirect, usePathname, useRouter } from "next/navigation";

import { FaChevronLeft } from "react-icons/fa";

import styles from "./styles.module.scss";

const Back = () => {
  const pathname = usePathname();
  const router = useRouter();

  const handleBack = () => {
    const pathnameArray = pathname?.split("/") as string[];
    pathnameArray.pop();
    const backTo = pathnameArray.join("/");

    router.push(backTo);
  };

  return (
    <button className={styles.container} onClick={handleBack}>
      <FaChevronLeft />
    </button>
  );
};

export default Back;
