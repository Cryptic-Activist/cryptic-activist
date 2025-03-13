import { Toast } from '@/zustand/app/types';

export type ToastComponent = {
  toast: Toast;
  removeToast: (id: string) => void;
};
