export type RegisterStore = {
  register: {
    privateKeys?: string[];
    firstName?: string;
    lastName?: string;
    username?: string;
    email?: string;
    setRegisterValue: (value: Value, actionName: `register/${string}`) => void;
    setPrivateKeys: (privateKeys: string[]) => void;
    resetPrivateKeys: () => void;
  };
};

export type RegisterSetter = {
  privateKeys?: string[];
  firstName?: string;
  lastName?: string;
  username?: string;
  email?: string;
};
export type Value = RegisterSetter;
