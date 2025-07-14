export type DefaultFields = {
	key: string;
	value: string;
	type: 'STRING' | 'NUMBER' | 'BOOLEAN';
	deletable: boolean;
	canBeDeleted: boolean;
	newField?: boolean;
};
