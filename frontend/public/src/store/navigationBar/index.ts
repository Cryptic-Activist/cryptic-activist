import { NavigationBarStore } from './types';
import { RootStore } from '../root/types';
import { StateCreator } from 'zustand';

export const useNavigationBarSlice: StateCreator<
  RootStore,
  [['zustand/devtools', never]],
  [],
  NavigationBarStore
> = (set, get) => ({
  navigationBar: {
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
      twoFactor: false,
      enableTwoFactor: false,
      paymentMethods: false,
      privateKeys: false,
      register: false,
      resetPasswordRequest: true,
      resetPassword: false,
      blockchain: false,
      verifyAccount: false,
      feedback: false,
    },
    status: 'idle',
    setNavigationBarValue: (params, actionName = 'navigationBar/setValue') => {
      set(
        ({
          navigationBar: {
            drawers,
            modals,
            status,
            tooltips,
            ...restNavigation
          },
        }) => {
          return {
            navigationBar: {
              ...restNavigation,
              drawers: params.drawers ?? drawers,
              modals: params.modals ?? modals,
              status: params.status ?? status,
              tooltips: params.tooltips ?? tooltips,
            },
          };
        },
        false,
        actionName
      );
    },
    toggleDrawer: (drawer) => {
      set(
        (state) => {
          const drawers = state.navigationBar.drawers;
          drawers[drawer] = !drawers[drawer];
          return {
            navigationBar: { ...state.navigationBar, drawers },
          };
        },
        false,
        'navigationBar/toggleDrawer'
      );
    },
    toggleModal: (modal) => {
      set(
        (state) => {
          const modals = state.navigationBar.modals;
          modals[modal] = !modals[modal];
          return {
            navigationBar: { ...state.navigationBar, modals },
          };
        },
        false,
        'navigationBar/toggleModal'
      );
    },
    toggleTooltip: (tooltip) => {
      set(
        (state) => {
          const tooltips = state.navigationBar.tooltips;
          tooltips[tooltip] = !tooltips[tooltip];
          return {
            navigationBar: { ...state.navigationBar, tooltips },
          };
        },
        false,
        'navigationBar/toggleTooltip'
      );
    },
    resetNavigationBar: () => {
      const setValue = get().navigationBar.setNavigationBarValue;
      setValue(
        {
          drawers: {
            user: false,
            wallet: false,
          },
          modals: {
            blockchain: false,
            cryptocurrencies: false,
            fiats: false,
            login: false,
            twoFactor: false,
            enableTwoFactor: false,
            paymentMethods: false,
            privateKeys: false,
            register: false,
            resetPasswordRequest: false,
            resetPassword: false,
            verifyAccount: false,
            feedback: false,
          },
          status: 'idle',
          tooltips: {
            user: false,
            wallet: false,
          },
        },
        'navigationBar/resetNavigationBar'
      );
    },
  },
});
