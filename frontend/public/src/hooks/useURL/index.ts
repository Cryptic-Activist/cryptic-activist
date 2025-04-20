'use client';

import { useParams, usePathname, useSearchParams } from 'next/navigation';

import useRouter from '../useRouter';

const useURL = () => {
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = useParams();

  const getSearchParams = (searchParam?: string) => {
    const paramsObject = Object.fromEntries(searchParams.entries());
    return searchParam ? paramsObject[searchParam] : paramsObject;
  };

  const removeSearchParam = (paramKey: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete(paramKey);
    const newUrl = `${pathname}?${params.toString()}`;
    replace(newUrl);
  };

  const clearSearchParams = (paramKey: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete(paramKey);
    const newUrl = `${pathname}?${params.toString()}`;
    replace(newUrl);
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
