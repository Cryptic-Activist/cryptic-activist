export type Setting = {
	key: string;
	value: string;
	type: 'STRING' | 'NUMBER' | 'BOOLEAN';
	deletable: boolean;
	canBeDeleted: boolean;
};

export type TradesState = {
	public: Setting[];
	private: Setting[];
};

export type SetterParams = {
	public?: Setting[];
	private?: Setting[];
};
