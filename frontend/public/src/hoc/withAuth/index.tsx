'use client';

import { getCookie } from '@/utils';
import { redirect } from 'next/navigation';

// // Define types for clarity
// type User = {
//   id: string;
//   name: string;
//   // other user properties
// };

// // Placeholder function to verify the token
// async function verifyToken(token: string): Promise<boolean> {
//   // Implement token verification logic
//   // For example, make an API call to verify the token
//   return true; // Placeholder return
// }

// // Placeholder function to get user data
// async function getUser(token: string): Promise<User> {
//   // Implement user data fetching logic
//   // For example, make an API call to get user data
//   return { id: '1', name: 'User' }; // Placeholder return
// }

export default function withAuth<T extends Record<string, any>>(
  WrappedComponent: React.ComponentType<T>
) {
  return function ProtectedComponent(originalProps: T) {
    const tokenCookie = getCookie('accessToken');

    if (tokenCookie === null) {
      redirect('/');
    }

    // const token = tokenCookie.value;
    // const isValid = await verifyToken(token);
    // if (!isValid) {
    //   redirect('/login');
    // }

    // const user = await getUser(token);
    return <WrappedComponent {...originalProps} />;
  };
}
