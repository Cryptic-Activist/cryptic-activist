'use client';

import React from 'react';
import Vendor from '.';
import { useVendor } from '@/hooks';

export default function VendorPage() {
  const {
    query: { isPending, isSuccess },
    vendor,
  } = useVendor();

  console.log({ vendor });

  return (
    <>
      {isPending && <h1>Loading...</h1>}
      {vendor.id && isSuccess && <Vendor vendor={vendor} />}
    </>
  );
}
