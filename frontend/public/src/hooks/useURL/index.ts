'use client';

import { useEffect, useState } from 'react';
import { useParams, usePathname } from 'next/navigation';

import { getQueries } from '@/utils';
import { useRouter } from '@/hooks';

const useURL = () => {
  const { replace } = useRouter();
  const pathname = usePathname();
  const params = useParams();

  const [searchParams, setSearchParams] = useState<{ [key: string]: string }>(
    {}
  );

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const entries: { [key: string]: string } = {};
    params.forEach((value, key) => {
      entries[key] = value;
    });
    setSearchParams(entries);
  }, [window?.location?.search]);

  const getSearchParams = (searchParam?: string) => {
    return searchParam ? searchParams[searchParam] : searchParams;
  };

  const removeSearchParam = (paramKey: string) => {
    const deletedProperty = Object.fromEntries(
      Object.entries(searchParams).filter(([key]) => key !== paramKey)
    );
    const queries = getQueries(deletedProperty);
    const newUrl = pathname + queries;
    replace(newUrl);
  };

  const clearSearchParams = () => {
    replace(pathname);
  };

  return {
    params,
    pathname,
    searchParams,
    getSearchParams,
    removeSearchParam,
    clearSearchParams,
  };
};

export default useURL;
