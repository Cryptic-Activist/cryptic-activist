import type {
  AuthHookResult,
  WithAuthAdvancedOptions,
  WithAuthOptions,
} from './types';
import React, { ComponentType, useEffect, useState } from 'react';

// ✅ Improved cookie parser
const getCookie = (name: string): string | null => {
  const cookies = document.cookie.split('; ');
  const cookie = cookies.find((row) => row.startsWith(`${name}=`));
  return cookie ? decodeURIComponent(cookie.split('=')[1]) : null;
};

// 🔐 HOC to protect routes
export const withAuth = <P extends object>(
  WrappedComponent: ComponentType<P>,
  options: WithAuthOptions = {}
) => {
  const {
    redirectTo = '/?login=1',
    cookieName = 'accessToken',
    loadingComponent = null,
    unauthorizedComponent = null,
    checkInterval = 1000000000,
  } = options;

  const AuthenticatedComponent: React.FC<P> = (props) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(
      null
    );
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
      const checkCookieExists = (): void => {
        const token = getCookie(cookieName);

        if (token && isAuthenticated !== true) {
          setIsAuthenticated(true);
        } else if (!token && isAuthenticated !== false) {
          setIsAuthenticated(false);

          const currentPath = window.location.pathname + window.location.search;
          sessionStorage.setItem('redirectPath', currentPath);
          window.location.href = redirectTo;
        }

        if (isLoading) setIsLoading(false);
      };

      checkCookieExists();
      const interval = setInterval(checkCookieExists, checkInterval);

      const handleStorageChange = (e: StorageEvent) => {
        if (e.key === 'logout' && e.newValue === 'true') {
          setIsAuthenticated(false);
          localStorage.removeItem('logout');
          window.location.href = redirectTo;
        }
      };

      const handleVisibilityChange = () => {
        if (!document.hidden) checkCookieExists();
      };

      window.addEventListener('storage', handleStorageChange);
      document.addEventListener('visibilitychange', handleVisibilityChange);

      return () => {
        clearInterval(interval);
        window.removeEventListener('storage', handleStorageChange);
        document.removeEventListener(
          'visibilitychange',
          handleVisibilityChange
        );
      };
    }, []);

    if (isLoading) {
      return (
        loadingComponent ?? (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100vh',
            }}
          >
            <div>Loading...</div>
          </div>
        )
      );
    }

    if (isAuthenticated === false && unauthorizedComponent) {
      return <>{unauthorizedComponent}</>;
    }

    if (isAuthenticated === true) {
      return <WrappedComponent {...props} />;
    }

    return null;
  };

  AuthenticatedComponent.displayName = `withAuth(${
    WrappedComponent.displayName || WrappedComponent.name
  })`;
  return AuthenticatedComponent;
};

// 🔐 Advanced HOC with async token validation
export const withAuthAdvanced = <P extends object>(
  WrappedComponent: ComponentType<P>,
  options: WithAuthAdvancedOptions = {}
) => {
  const {
    redirectTo = '/?login=1',
    cookieName = 'accessToken',
    validateToken = null,
    loadingComponent = null,
    unauthorizedComponent = null,
    checkInterval = 1000000000,
  } = options;

  const AuthenticatedComponent: React.FC<P> = (props) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(
      null
    );
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
      const checkCookieExists = async (): Promise<void> => {
        const token = getCookie(cookieName);

        if (token) {
          if (validateToken) {
            const isValid = await validateToken(token);
            if (!isValid) {
              setIsAuthenticated(false);
              const currentPath =
                window.location.pathname + window.location.search;
              sessionStorage.setItem('redirectPath', currentPath);
              window.location.href = redirectTo;
              return;
            }
          }
          setIsAuthenticated(true);
        } else if (isAuthenticated !== false) {
          setIsAuthenticated(false);
          const currentPath = window.location.pathname + window.location.search;
          sessionStorage.setItem('redirectPath', currentPath);
          window.location.href = redirectTo;
        }

        if (isLoading) setIsLoading(false);
      };

      checkCookieExists();
      const interval = setInterval(checkCookieExists, checkInterval);

      const handleStorageChange = (e: StorageEvent) => {
        if (e.key === 'logout' && e.newValue === 'true') {
          setIsAuthenticated(false);
          localStorage.removeItem('logout');
          window.location.href = redirectTo;
        }
      };

      const handleVisibilityChange = () => {
        if (!document.hidden) checkCookieExists();
      };

      window.addEventListener('storage', handleStorageChange);
      document.addEventListener('visibilitychange', handleVisibilityChange);

      return () => {
        clearInterval(interval);
        window.removeEventListener('storage', handleStorageChange);
        document.removeEventListener(
          'visibilitychange',
          handleVisibilityChange
        );
      };
    }, []);

    if (isLoading) {
      return (
        loadingComponent ?? (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100vh',
            }}
          >
            <div>Loading...</div>
          </div>
        )
      );
    }

    if (isAuthenticated === false && unauthorizedComponent) {
      return <>{unauthorizedComponent}</>;
    }

    if (isAuthenticated === true) {
      return <WrappedComponent {...props} />;
    }

    return null;
  };

  AuthenticatedComponent.displayName = `withAuthAdvanced(${
    WrappedComponent.displayName || WrappedComponent.name
  })`;
  return AuthenticatedComponent;
};

// 🪝 Auth hook
export const useAuth = (cookieName: string = 'authToken'): AuthHookResult => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkAuth = () => {
      const token = getCookie(cookieName);
      setIsAuthenticated(!!token);
      setIsLoading(false);
    };

    checkAuth();
    const interval = setInterval(checkAuth, 5000);

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'logout' && e.newValue === 'true') {
        setIsAuthenticated(false);
        localStorage.removeItem('logout');
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      clearInterval(interval);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [cookieName]);

  return { isAuthenticated, isLoading };
};

// 🔓 Logout helpers
export const logoutUser = (): void => {
  document.cookie.split(';').forEach((cookie) => {
    const name = cookie.split('=')[0].trim();
    if (name.includes('auth') || name.includes('token')) {
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
    }
  });

  localStorage.setItem('logout', 'true');
  window.location.href = '/login';
};

export const clearAuthCookie = (cookieName: string): void => {
  document.cookie = `${cookieName}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
  localStorage.setItem('logout', 'true');
};
