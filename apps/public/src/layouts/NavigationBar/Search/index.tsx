import { FaSearch } from 'react-icons/fa';

import styles from './index.module.scss';

const Search = () => {
  return (
    <div className={styles.container}>
      <input type="text" className={styles.input} placeholder="Search..." />
      <button className={styles.button}>
        <FaSearch />
      </button>
    </div>
  );
};

export default Search;
