import { Spinner } from '../Spinner';
import { ErrorPanel } from './ErrorPanel';

export const ProgressPanel = ({
  isLoading,
  isError,
  children,
  errorComponent = <ErrorPanel />,
}: {
  isLoading: boolean;
  isError?: boolean;
  children: React.ReactNode;
  errorComponent?: React.ReactNode;
}) => {
  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <>{errorComponent}</>;
  }

  return <>{children}</>;
};
