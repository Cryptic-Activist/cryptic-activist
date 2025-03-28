import styles from "./styles.module.scss";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p className={styles.statement}>
        &copy;{" "}
        {`${new Date().getFullYear()} Cryptic Activist Catalog - All rights reserved`}
      </p>
    </footer>
  );
};

export default Footer;
