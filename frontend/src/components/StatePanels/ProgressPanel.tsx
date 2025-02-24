import { Spinner } from '../basic/Spinner';
import { ErrorPanel } from './ErrorPanel';
import { InfoPanel } from './InfoPanel';

export const ProgressPanel = ({
  isLoading,
  children,
  isError,
  errorComponent = <ErrorPanel />,
  nothingFound,
  nothingFoundComponent = <InfoPanel />,
}: {
  isLoading: boolean;
  children: React.ReactNode;
  isError?: boolean;
  errorComponent?: React.ReactNode;
  nothingFound?: boolean;
  nothingFoundComponent?: React.ReactNode;
}) => {
  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <>{errorComponent}</>;
  }

  if (nothingFound) {
    return <>{nothingFoundComponent}</>;
  }

  return <>{children}</>;
};
