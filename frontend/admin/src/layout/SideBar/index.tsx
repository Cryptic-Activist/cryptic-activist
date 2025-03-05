import Item from "./Item";

import styles from "./styles.module.scss";

const SideBar = () => {
  return (
    <aside className={styles.aside}>
      <ul className={styles.asideList}>
        <Item href="/users" label="Users" />
        <Item href="/offers" label="Offers" />
        <Item href="/trades" label="Trades" />
        <Item href="/payment-methods" label="Payment Methods" />
        <Item
          href="/payment-method-categories"
          label="Payment Method Categories"
        />
        <Item href="/chats" label="Chats" />
        <Item href="/fiats" label="Fiats" />
        <Item href="/cryptocurrencies" label="Cryptocurrencies" />
      </ul>
    </aside>
  );
};

export default SideBar;
