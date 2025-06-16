export const capitalizePathname = (string: string, splitFactor: string) => {
	const array = string.split(splitFactor);
	const capitalized = array.map((element) => {
		const initial = element.substring(0, 1).toUpperCase();
		const rest = element.substring(1, element.length);
		return initial.concat(rest);
	});
	return capitalized.join(' ');
};

export const toUpperCase = (text?: string) => {
	return text ? text?.toUpperCase() : '';
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

export const toCapitalize = (string: string): string => {
	return `${string.substring(0, 1).toUpperCase()}${string.substring(
		1,
		string.length
	)}`;
};

export const humanizeCamelCase = (str: string) => {
	return (
		str
			// Insert a space before all capital letters
			.replace(/([A-Z])/g, ' $1')
			// Capitalize the first character
			.replace(/^./, (char) => char.toUpperCase())
	);
};

export const formatEnum = (input?: string) => {
	if (!input) return '';

	return input
		.toLowerCase()
		.replace(/_/g, ' ')
		.replace(/\b\w/g, (char) => char.toUpperCase());
};

// export const getBearerToken = () => {
// 	const accessToken = getCookie('accessToken');

// 	if (accessToken === null) {
// 		throw new Error('JWT not found');
// 	}

// 	return `Bearer ${accessToken}`;
// };
