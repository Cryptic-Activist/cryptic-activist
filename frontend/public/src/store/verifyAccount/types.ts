type PrivateKeys = string[];

export type VerifyAccountState = {
  username: string;
  privateKeys: PrivateKeys;
  privateKeysArray: PrivateKeys;
  isSubmitted: boolean;
};

export type VerifyAccountSetter = {
  username?: string;
  privateKeys?: PrivateKeys;
  privateKeysArray?: PrivateKeys;
  isSubmitted?: boolean;
};

export type SetUsernameParam = { username: string };

export type SetPrivateKeysParam = { privateKeys: PrivateKeys };

export type SubmitVerifyPrivateKeysParams = {
  username: string;
  privateKeys: PrivateKeys;
};
