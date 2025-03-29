export const mapAdmins = (admins: any[]) => {
  const mapped = admins.map((admin) => {
    return {
      id: admin.id,
      names: {
        firstName: admin.firstName,
        lastName: admin.lastName,
      },
      adminname: admin.adminname,
      createdAt: admin.createdAt,
      updatedAt: admin.updatedAt,
    };
  });

  return mapped;
};
