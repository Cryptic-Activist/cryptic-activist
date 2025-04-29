import { BACKEND } from '@/constants';
import { fetchGet } from '@/services/axios';

export const getVendor = async (vendorId: string) => {
  const response = await fetchGet(`${BACKEND}/vendors/` + vendorId);

  if (response.status !== 200) return null;

  return response.data;
};
