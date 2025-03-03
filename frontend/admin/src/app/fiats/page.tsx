"use client";
import React from "react";
import useFiats from "@/hooks/useFiats";
import { FiatsList as List } from "@/components/List";

const Fiats = () => {
  const { fiats } = useFiats(true);

  return <List items={fiats.data} />;
};

export default Fiats;
