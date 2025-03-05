export const isLoggedIn = (admin?: any) => {
  if (admin) {
    return Object.entries(admin).length > 0;
  }
  return false;
};
