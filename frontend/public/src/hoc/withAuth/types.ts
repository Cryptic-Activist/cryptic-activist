export interface WithAuthOptions {
  redirectTo?: string;
  cookieName?: string;
  loadingComponent?: React.ReactNode;
  unauthorizedComponent?: React.ReactNode;
}

export interface WithAuthAdvancedOptions extends WithAuthOptions {
  validateToken?: (token: string) => Promise<boolean> | boolean;
}

export interface AuthHookResult {
  isAuthenticated: boolean | null;
  isLoading: boolean;
}
