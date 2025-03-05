export const toCapitalize = (string: string): string => {
  return `${string.substring(0, 1).toUpperCase()}${string.substring(
    1,
    string.length
  )}`;
};

export const toUpperCase = (text: string) => {
  return text.toUpperCase();
};

export const toLowerCase = (text: string) => {
  return text.toLowerCase();
};

export const getInitials = (firstName: string, lastName: string): string => {
  const firstInitial: string = firstName.substring(0, 1).toUpperCase();
  const lastInitial: string = lastName.substring(0, 1).toUpperCase();

  return firstInitial.concat(lastInitial);
};

export const convertStringToArrayOfStrings = (string: string): string[] => {
  const stringArr: string[] = string.trim().split(',');

  const trimmedStringArr: string[] = stringArr.map((s) => s.trim());
  return trimmedStringArr;
};

export const getBearerToken = (token: string) => `Bearer ${token}`;
