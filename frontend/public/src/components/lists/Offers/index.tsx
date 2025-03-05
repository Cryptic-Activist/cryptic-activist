import styles from './index.module.scss';

import Header from './Header';
import List from './List';

const Offers = () => {
  return (
    <div className={styles.container}>
      <Header />
      <List />
    </div>
  );
};

export default Offers;
