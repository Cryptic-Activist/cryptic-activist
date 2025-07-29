import { useEffect, useState } from 'react';

import { getCookie } from '@/utils';
import { validateWithAuthToken } from '@/services/user';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = getCookie('accessToken');
      if (token) {
        try {
          const isValid = await validateWithAuthToken();
          setIsAuthenticated(isValid);
        } catch (error) {
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  return { isAuthenticated, isLoading };
};
