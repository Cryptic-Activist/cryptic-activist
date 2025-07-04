type NavigationBarStatus = 'idle' | 'loading' | 'success' | 'failed';

export type Drawers = {
  user: boolean;
  wallet: boolean;
};

type Tooltips = {
  user: boolean;
  wallet: boolean;
};

type Modals = {
  login: boolean;
  twoFactor: boolean;
  enableTwoFactor: boolean;
  register: boolean;
  resetPasswordRequest: boolean;
  resetPassword: boolean;
  verifyAccount: boolean;
  privateKeys: boolean;
  cryptocurrencies: boolean;
  chains: boolean;
  wallets: boolean;
  fiats: boolean;
  paymentMethods: boolean;
  blockchain: boolean;
  feedback: boolean;
  startTradeConfirmation: boolean;
  disputeRequest: boolean;
};

export type NavigationBarStore = {
  navigationBar: {
    drawers: Drawers;
    tooltips: Tooltips;
    modals: Modals;
    status: NavigationBarStatus;
    setNavigationBarValue: (
      value: Value,
      actionName: `navigationBar/${string}`
    ) => void;
    toggleDrawer: (drawer: Drawer) => void;
    toggleModal: (modal: Modal) => void;
    toggleTooltip: (tooltip: Tooltip) => void;
    resetNavigationBar: () => void;
  };
};

export type NavigationBarStateSetter = {
  drawers?: Drawers;
  tooltips?: Tooltips;
  modals?: Modals;
  status?: NavigationBarStatus;
};

export type Value = NavigationBarStateSetter;

export type Drawer = 'user' | 'wallet';

export type ToggleDrawerActionPayload = {
  drawer: Drawer;
};

export type Modal =
  | 'login'
  | 'twoFactor'
  | 'enableTwoFactor'
  | 'register'
  | 'resetPasswordRequest'
  | 'resetPassword'
  | 'verifyAccount'
  | 'privateKeys'
  | 'cryptocurrencies'
  | 'fiats'
  | 'chains'
  | 'paymentMethods'
  | 'blockchain'
  | 'feedback'
  | 'startTradeConfirmation'
  | 'disputeRequest'
  | 'chains'
  | 'wallets';

export type ToggleModalActionPayload = {
  modal: Modal;
};

export type Tooltip = 'user' | 'wallet';

export type ToggleTooltipActionPayload = {
  tooltip: Tooltip;
};

export type ResetNavigationBarPayload = 'drawers' | 'modals' | 'tooltips';
