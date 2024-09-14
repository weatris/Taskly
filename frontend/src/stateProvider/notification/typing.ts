export type notificationMessageType = 'alert' | 'success' | 'error' | 'info';

export type notificationType = {
  id?: string;
  title: string;
  subtitle?: string;
  type?: notificationMessageType;
};
