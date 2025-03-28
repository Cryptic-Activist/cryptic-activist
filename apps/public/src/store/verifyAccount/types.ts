type PrivateKeys = string[];

export type VerifyAccountStore = {
  verifyAccount: {
    username?: string;
    privateKeys?: PrivateKeys;
    privateKeysArray?: PrivateKeys;
    isSubmitted?: boolean;
    setVerifyAccountValue: (
      value: Value,
      action?: `verifyAccount/${string}`
    ) => void;
    setUsername: (param: SetUsernameParam) => void;
    setPrivateKeys: (param: SetPrivateKeysParam) => void;
    setPrivateKeysArray: () => void;
    verifyPrivateKeys: (
      params: SubmitVerifyPrivateKeysParams
    ) => Promise<boolean>;
  };
};

export type VerifyAccountSetter = {
  username?: string;
  privateKeys?: PrivateKeys;
  privateKeysArray?: PrivateKeys;
  isSubmitted?: boolean;
};

export type Value = VerifyAccountSetter;

export type SetUsernameParam = { username: string };

export type SetPrivateKeysParam = { privateKeys: PrivateKeys };

export type SubmitVerifyPrivateKeysParams = {
  username: string;
  privateKeys: PrivateKeys;
};
