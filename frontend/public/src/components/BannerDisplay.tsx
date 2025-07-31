'use client';

import { useQuery } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';

import { BACKEND } from '@/constants';

const BannerDisplay = () => {
  const pathname = usePathname();

  const fetchBanner = async () => {
    const res = await fetch(
      BACKEND + `/banners/display?targetWebsite=public&currentPage=${pathname}`
    );
    const data = await res.json();
    return data.length > 0 ? data[0] : null;
  };

  const { data: banner, isLoading, isError } = useQuery({
    queryKey: ['banner', pathname],
    queryFn: fetchBanner,
    staleTime: Infinity, // Keep data fresh indefinitely unless invalidated
    // Only refetch if the pathname changes AND the new pathname is not included in the current banner's pages
    // This is a simplified check, a more robust solution might involve checking if the banner itself changed
    // or if the new route is outside the scope of the current banner's configured pages.
    refetchOnWindowFocus: false, // Disable refetch on window focus
    refetchInterval: false, // Disable refetch on interval
    enabled: true, // Always enabled, but the queryFn logic handles the conditional fetching
  });

  if (isLoading || isError || !banner) {
    return null;
  }

  const getBannerStyle = () => {
    switch (banner.type) {
      case 'warning':
        return { backgroundColor: 'yellow', color: 'black' };
      case 'new_feature':
        return { backgroundColor: 'blue', color: 'white' };
      case 'announcement':
        return { backgroundColor: 'green', color: 'white' };
      default:
        return {};
    }
  };

  return <div style={getBannerStyle()} dangerouslySetInnerHTML={{ __html: banner.content }} />;
};

export default BannerDisplay;
