export type Setting = {
	key: string;
	value: string;
	type: 'STRING' | 'NUMBER' | 'BOOLEAN';
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
