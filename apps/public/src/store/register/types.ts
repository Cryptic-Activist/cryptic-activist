export type RegisterStore = {
  register: {
    privateKeys?: string[];
    setRegisterValue: (value: Value, actionName: `register/${string}`) => void;
    setPrivateKeys: (privateKeys: string[]) => void;
    resetPrivateKeys: () => void;
  };
};

export type RegisterSetter = {
  privateKeys?: string[];
};
export type Value = RegisterSetter;
