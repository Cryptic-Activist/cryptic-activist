import type {
  AuthHookResult,
  WithAuthAdvancedOptions,
  WithAuthOptions,
} from './types';
import React, { ComponentType, useEffect, useState } from 'react';

// Utility function to get cookie value by name
const getCookie = (name: string): string | null => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    const cookieValue = parts.pop()?.split(';').shift();
    return cookieValue || null;
  }
  return null;
};

// HOC to protect routes
const withAuth = <P extends object>(
  WrappedComponent: ComponentType<P>,
  options: WithAuthOptions = {}
) => {
  const {
    redirectTo = '/?login=1',
    cookieName = 'accessToken',
    loadingComponent = null,
    unauthorizedComponent = null,
    checkInterval = 5000, // Default 5 seconds
  } = options;

  const AuthenticatedComponent: React.FC<P> = (props) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(
      null
    );
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
      const checkAuth = (): void => {
        try {
          const token = getCookie(cookieName);

          if (token) {
            setIsAuthenticated(true);
          } else {
            setIsAuthenticated(false);
          }
        } catch (error) {
          console.error('Error checking authentication:', error);
          setIsAuthenticated(false);
        } finally {
          setIsLoading(false);
        }
      };

      // Initial check
      checkAuth();

      // Set up interval to check cookie periodically
      const interval = setInterval(checkAuth, checkInterval);

      // Set up storage event listener for cross-tab logout
      const handleStorageChange = (e: StorageEvent) => {
        if (e.key === 'logout' && e.newValue === 'true') {
          setIsAuthenticated(false);
          localStorage.removeItem('logout');
        }
      };

      window.addEventListener('storage', handleStorageChange);

      // Cleanup
      return () => {
        clearInterval(interval);
        window.removeEventListener('storage', handleStorageChange);
      };
    }, []);

    // Handle redirect for unauthenticated users
    useEffect(() => {
      if (isAuthenticated === false) {
        // Store current location for redirect after login
        const currentPath = window.location.pathname + window.location.search;
        sessionStorage.setItem('redirectPath', currentPath);

        // Redirect to login page
        window.location.href = redirectTo;
      }
    }, [isAuthenticated]);

    // Show loading component while checking authentication
    if (isLoading) {
      return loadingComponent ? (
        <>{loadingComponent}</>
      ) : (
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
      );
    }

    // Show unauthorized component if provided
    if (isAuthenticated === false && unauthorizedComponent) {
      return <>{unauthorizedComponent}</>;
    }

    // Render the wrapped component if authenticated
    if (isAuthenticated === true) {
      return <WrappedComponent {...props} />;
    }

    // Return null while redirecting
    return null;
  };

  // Set display name for debugging
  AuthenticatedComponent.displayName = `withAuth(${
    WrappedComponent.displayName || WrappedComponent.name
  })`;

  return AuthenticatedComponent;
};

export default withAuth;

// Advanced HOC with token validation
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
    checkInterval = 5000, // Default 5 seconds
  } = options;

  const AuthenticatedComponent: React.FC<P> = (props) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(
      null
    );
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
      const checkAuth = async (): Promise<void> => {
        try {
          const token = getCookie(cookieName);

          if (token) {
            if (validateToken) {
              const isValid = await validateToken(token);
              setIsAuthenticated(isValid);
            } else {
              setIsAuthenticated(true);
            }
          } else {
            setIsAuthenticated(false);
          }
        } catch (error) {
          console.error('Error checking authentication:', error);
          setIsAuthenticated(false);
        } finally {
          setIsLoading(false);
        }
      };

      // Initial check
      checkAuth();

      // Set up interval to check cookie periodically
      const interval = setInterval(checkAuth, checkInterval);

      // Set up storage event listener for cross-tab logout
      const handleStorageChange = (e: StorageEvent) => {
        if (e.key === 'logout' && e.newValue === 'true') {
          setIsAuthenticated(false);
          localStorage.removeItem('logout');
        }
      };

      window.addEventListener('storage', handleStorageChange);

      // Cleanup
      return () => {
        clearInterval(interval);
        window.removeEventListener('storage', handleStorageChange);
      };
    }, []);

    useEffect(() => {
      if (isAuthenticated === false) {
        const currentPath = window.location.pathname + window.location.search;
        sessionStorage.setItem('redirectPath', currentPath);
        window.location.href = redirectTo;
      }
    }, [isAuthenticated]);

    if (isLoading) {
      return loadingComponent ? (
        <>{loadingComponent}</>
      ) : (
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

// Hook version for functional components
export const useAuth = (cookieName: string = 'authToken'): AuthHookResult => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkAuth = (): void => {
      try {
        const token = getCookie(cookieName);
        setIsAuthenticated(!!token);
      } catch (error) {
        console.error('Error checking authentication:', error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    // Initial check
    checkAuth();

    // Set up interval to check cookie periodically
    const interval = setInterval(checkAuth, 5000); // Check every 5 seconds

    // Set up storage event listener for cross-tab logout
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'logout' && e.newValue === 'true') {
        setIsAuthenticated(false);
        localStorage.removeItem('logout');
      }
    };

    window.addEventListener('storage', handleStorageChange);

    // Cleanup
    return () => {
      clearInterval(interval);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [cookieName]);

  return { isAuthenticated, isLoading };
};

// Utility functions for logout management
export const logoutUser = (): void => {
  // Clear all auth-related cookies
  document.cookie.split(';').forEach((cookie) => {
    const eqPos = cookie.indexOf('=');
    const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();
    if (name.includes('auth') || name.includes('token')) {
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
    }
  });

  // Trigger logout in all tabs
  localStorage.setItem('logout', 'true');

  // Redirect to login
  window.location.href = '/login';
};

// Clear specific auth cookie
export const clearAuthCookie = (cookieName: string): void => {
  document.cookie = `${cookieName}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;

  // Trigger logout in all tabs
  localStorage.setItem('logout', 'true');
};

// Basic usage
// interface DashboardProps {
//   userId: string;
//   theme: 'light' | 'dark';
// }
// const Dashboard: React.FC<DashboardProps> = ({ userId, theme }) => {
//   return <div>Dashboard for {userId}</div>;
// };
// const ProtectedDashboard = withAuth(Dashboard);

// With custom options
// interface ProfileProps {
//   username: string;
//   email: string;
// }
// const Profile: React.FC<ProfileProps> = ({ username, email }) => {
//   return <div>Profile: {username} - {email}</div>;
// };
// const ProtectedProfile = withAuth(Profile, {
//   redirectTo: '/signin',
//   cookieName: 'userToken',
//   loadingComponent: <div>Custom loading...</div>,
//   unauthorizedComponent: <div>Access denied</div>
// });

// Advanced usage with token validation
// const AdminPanel: React.FC = () => {
//   return <div>Admin Panel</div>;
// };
// const ProtectedAdmin = withAuthAdvanced(AdminPanel, {
//   cookieName: 'adminToken',
//   validateToken: async (token: string): Promise<boolean> => {
//     try {
//       const response = await fetch('/api/validate-token', {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       return response.ok;
//     } catch {
//       return false;
//     }
//   }
// });

// Using the hook in a functional component
// const SomeComponent: React.FC = () => {
//   const { isAuthenticated, isLoading } = useAuth('myAuthToken');
//
//   if (isLoading) return <div>Loading...</div>;
//   if (!isAuthenticated) return <div>Please log in</div>;
//
//   return <div>Welcome, authenticated user!</div>;
// };
