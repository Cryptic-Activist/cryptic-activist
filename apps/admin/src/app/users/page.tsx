"use client";
import React from "react";
import useUsers from "@/hooks/useUsers";
import { UsersList as List } from "@/components/List";

const Users = () => {
  const { users } = useUsers(true);

  return <List items={users.data} />;
};

export default Users;
