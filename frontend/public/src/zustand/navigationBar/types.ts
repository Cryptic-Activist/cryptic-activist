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
  register: boolean;
  resetPassword: boolean;
  verifyAccount: boolean;
  privateKeys: boolean;
  cryptocurrencies: boolean;
  fiats: boolean;
  paymentMethods: boolean;
  blockchain: boolean;
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
  | 'register'
  | 'resetPassword'
  | 'verifyAccount'
  | 'privateKeys'
  | 'cryptocurrencies'
  | 'fiats'
  | 'paymentMethods'
  | 'blockchain';

export type ToggleModalActionPayload = {
  modal: Modal;
};

export type Tooltip = 'user' | 'wallet';

export type ToggleTooltipActionPayload = {
  tooltip: Tooltip;
};

export type ResetNavigationBarPayload = 'drawers' | 'modals' | 'tooltips';
