"use client";
import { useStore } from "@nanostores/react";
import { useEffect } from "react";

import { createFiat, createAllFiats, listFiats, fiats } from "@/stores/fiats";
import { CreateFiatParams, UseFiatsParams } from "./types";

const useFiats = (fetchData?: UseFiatsParams) => {
  const $fiats = useStore(fiats);

  const handleCreateFiat = async (data: CreateFiatParams) => {
    await createFiat(data);
  };

  const handleListFiats = async () => {
    await listFiats();
  };

  const handleCreateAllFiats = async () => {
    await createAllFiats();
  };

  useEffect(() => {
    if (fetchData) {
      handleListFiats();
    }
  }, [fetchData]);

  return {
    handleCreateFiat,
    handleCreateAllFiats,
    handleListFiats,
    fiats: $fiats,
  };
};

export default useFiats;
