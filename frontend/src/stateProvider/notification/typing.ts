export type notificationType = {
  id?: string;
  title: string;
  subtitle?: string;
  type?: 'alert' | 'success' | 'error' | 'info';
};
