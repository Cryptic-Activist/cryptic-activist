"use client";
import { CryptocurrenciesList as List } from "@/components/List";
import useCryptocurrencies from "@/hooks/useCryptocurrencies";

const Users = () => {
  const { cryptocurrencies } = useCryptocurrencies(true);

  return <List items={cryptocurrencies.data} />;
};

export default Users;
