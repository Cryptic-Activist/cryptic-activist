import { Toast } from '@/store/app/types';

export type ToastComponent = {
  toast: Toast;
  removeToast: (id: string) => void;
};
