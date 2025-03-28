import { toCapitalize } from '../string';

export const parseInstancePath = (instancePath: string) => {
	const pathName = instancePath.split('/')[1];
	return toCapitalize(pathName);
};
