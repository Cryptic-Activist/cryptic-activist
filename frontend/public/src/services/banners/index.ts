import { BACKEND } from '@/constants';
import { fetchGet } from '../axios';

export const fetchBanners = async (pathname: string) => {
  const response = await fetchGet(
    `${BACKEND}/banners/display?targetWebsite=public&currentPage=${pathname}`
  );

  if (response.status !== 200) {
    return null;
  }

  return response.data && response.data?.length > 0 ? response.data[0] : null;
};
