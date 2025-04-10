'use client';

import { NavigateOptions } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useRouter as useRouterNext } from 'next/navigation';

const useRouter = () => {
  const router = useRouterNext();

  const push = (href: string, options?: NavigateOptions) => {
    router.push(href, options);
  };

  const replace = (href: string, options?: NavigateOptions) => {
    router.replace(href, options);
  };

  const back = () => {
    router.back();
  };

  return { push, replace, back };
};

export default useRouter;
