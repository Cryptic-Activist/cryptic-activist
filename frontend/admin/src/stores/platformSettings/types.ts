export type Setting = {
	key: string;
	value: string | number | boolean;
	type: 'STRING' | 'NUMBER' | 'BOOLEAN';
};

export type TradesState = {
	public: Setting[];
	private: Setting[];
};

export type SetterParams = {
	public?: Setting[];
	private?: Setting[];
};
