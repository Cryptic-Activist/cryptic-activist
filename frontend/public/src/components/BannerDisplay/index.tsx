'use client';

import { fetchBanners } from '@/services/banners';
import { slateToHtml } from '@/utils/slate';
import styles from './index.module.scss';
import { usePathname } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

const BannerDisplay = () => {
  const pathname = usePathname();

  const {
    data: banner,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['banner', pathname],
    queryFn: async () => {
      const response = await fetchBanners(pathname);
      return response;
    },
    staleTime: Infinity, // Keep data fresh indefinitely unless invalidated
    // Only refetch if the pathname changes AND the new pathname is not included in the current banner's pages
    // This is a simplified check, a more robust solution might involve checking if the banner itself changed
    // or if the new route is outside the scope of the current banner's configured pages.
    refetchOnWindowFocus: false,
    refetchInterval: false,
    enabled: true,
  });

  if (isLoading || isError || !banner) {
    return null;
  }

  const getBannerStyle = () => {
    switch (banner.type) {
      case 'WARNING':
        return styles.warning;
      case 'NEW_FEATURE':
        return styles.newFeature;
      case 'ANNOUNCEMENT':
        return styles.announcement;
      default:
        return {};
    }
  };

  return (
    <div
      className={`${styles.banner} ${getBannerStyle()}`}
      dangerouslySetInnerHTML={{
        __html: slateToHtml(JSON.parse(banner.content)),
      }}
    />
  );
};

export default BannerDisplay;
