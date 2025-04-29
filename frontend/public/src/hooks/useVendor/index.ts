'use client';

import { getVendor } from '@/services/vendor';
import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { useRootStore } from '@/store';

const useVendor = () => {
  const params = useParams();
  const id = params.id?.toString();
  const { vendor } = useRootStore();

  const query = useQuery({
    queryKey: ['vendor'],
    queryFn: async () => {
      if (id) {
        const details = await getVendor(id);
        return details;
      }
    },
    enabled: !!id,
    refetchOnMount: true,
    retry: 3,
  });

  useEffect(() => {
    if (query.data) {
      vendor.setVendor(query.data);
    }
  }, [query.data]);

  return {
    query,
    vendor,
  };
};

export default useVendor;
