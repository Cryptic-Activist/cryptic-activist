import { map } from 'nanostores';

import type {
  Drawer,
  Modal,
  NavigationBarState,
  NavigationBarStateSetter,
  Tooltip,
} from './types';

export const $navigationBar = map<NavigationBarState>({
  drawers: {
    user: false,
    wallet: false,
  },
  tooltips: {
    user: false,
    wallet: false,
  },
  modals: {
    cryptocurrencies: false,
    fiats: false,
    login: false,
    paymentMethods: false,
    privateKeys: false,
    register: false,
    resetPassword: false,
    blockchain: false,
    verifyAccount: false,
  },
  status: 'idle',
});

const setter = ({
  drawers,
  modals,
  status,
  tooltips,
}: NavigationBarStateSetter) => {
  const navbar = $navigationBar.get();

  $navigationBar.set({
    drawers: drawers ?? navbar.drawers,
    modals: modals ?? navbar.modals,
    status: status ?? navbar.status,
    tooltips: tooltips ?? navbar.tooltips,
  });
};

export const toggleDrawer = (drawer: Drawer) => {
  const drawers = $navigationBar.get().drawers;
  drawers[drawer] = !drawers[drawer];
  setter({ drawers });
};

export const toggleModal = (modal: Modal) => {
  const modals = $navigationBar.get().modals;
  modals[modal] = !modals[modal];
  setter({ modals });
};

export const toggleTooltip = (tooltip: Tooltip) => {
  const tooltips = $navigationBar.get().tooltips;
  tooltips[tooltip] = !tooltips[tooltip];
  setter({ tooltips });
};

export const resetNavigationBar = () => {
  setter({
    drawers: {
      user: false,
      wallet: false,
    },
    tooltips: {
      user: false,
      wallet: false,
    },
    modals: {
      cryptocurrencies: false,
      fiats: false,
      login: false,
      paymentMethods: false,
      privateKeys: false,
      register: false,
      resetPassword: false,
      blockchain: false,
      verifyAccount: false,
    },
    status: 'idle',
  });
};
