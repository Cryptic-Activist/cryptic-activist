export const mapUsers = (users: any[]) => {
  const mapped = users.map((user) => {
    return {
      id: user.id,
      names: {
        firstName: user.firstName,
        lastName: user.lastName,
      },
      username: user.username,
      profileColor: user.profileColor,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  });

  return mapped;
};
