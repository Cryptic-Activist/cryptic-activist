'use client';

import { useEffect, useState } from 'react';

import { BACKEND } from '@/constants';
import { usePathname } from 'next/navigation';

const BannerDisplay = () => {
  const [banner, setBanner] = useState<any>(null);
  const pathname = usePathname();

  useEffect(() => {
    const fetchBanner = async () => {
      const res = await fetch(
        BACKEND + `/banners/display?targetWebsite=public&targetPage=${pathname}`
      );
      const data = await res.json();
      if (data.length > 0) {
        setBanner(data[0]);
      }
    };
    fetchBanner();
  }, [pathname]);

  if (!banner) {
    return null;
  }

  return <div dangerouslySetInnerHTML={{ __html: banner.content }} />;
};

export default BannerDisplay;
