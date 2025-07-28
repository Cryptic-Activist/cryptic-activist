
'use client';

import withAuth from '@/hoc/withAuth';

const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default withAuth(AuthWrapper);
