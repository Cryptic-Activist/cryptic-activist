export type Type =
  | 'TRADE_STARTED'
  | 'TRADE_COMPLETED'
  | 'TRADE_CANCELLED'
  | 'TRADE_PENDING'
  | 'TRADE_CANCELLED_BY_MODERATOR'
  | 'TRADE_DISPUTE_OPENED'
  | 'TRADE_DISPUTE_RESOLVED'
  | 'TRADE_EXPIRED'
  | 'TRADE_FAILED'
  | 'TRADE_NEW_MESSAGE'
  | 'NEW_LOGIN'
  | 'MAINTENANCE'
  | 'SUSPICIOUS_ACTIVITY'
  | 'PASSWORD_CHANGED'
  | 'TWO_FA_ENABLED'
  | 'TWO_FA_DISABLED'
  | 'ACCOUNT_VERIFICATION_REQUIRED'
  | 'ACCOUNT_SUSPENDED'
  | 'REVIEW_RECEIVED'
  | 'REVIEW_REMINDER'
  | 'POLICY_UPDATE'
  | 'FEATURE_ANNOUNCEMENT'
  | 'PROMOTIONAL_OFFER'
  | 'COMPLIANCE_NOTICE'
  | 'SYSTEM_ERROR'
  | 'API_DOWNTIME'
  | 'USER_WARNING'
  | 'TRADE_DISPUTE_MORE_EVIDENCES';

export type Notification = {
  id: string;
  type: Type;
  message: string;
  whenSeen: string;
  url: string;
  createdAt: string;
};

export type NotificationsSetter = {
  data?: Notification[];
  hasNewNotification?: boolean;
  totalPages?: number;
  currentPage?: number;
  pageSize?: number;
};

export type Value = NotificationsSetter;

export type NotificationsStore = {
  notifications: {
    data: Notification[];
    hasNewNotification: boolean;
    totalPages: number;
    currentPage: number;
    pageSize: number;
    setNotificationValue: (
      value: Value,
      action?: `notifications/${string}`
    ) => void;
    setHasNewNotification: (hasNotification: boolean) => void;
  };
};
