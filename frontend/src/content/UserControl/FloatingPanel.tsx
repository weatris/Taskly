import classNames from 'classnames';
import { Stack } from '../../components/basic/Stack/Stack';
import { useScreenDetector } from '../../utils/useScreenDetector';
import { ProgressPanel } from '../../components/StatePanels/ProgressPanel';

export const FloatingPanel = ({
  children,
  isLoading = false,
}: {
  children: React.ReactNode;
  isLoading?: boolean;
}) => {
  const { isMobile } = useScreenDetector();

  return (
    <Stack className="w-full h-full bg-blue-50" justifyContent="center">
      <ProgressPanel {...{ isLoading }}>
        <Stack
          className={classNames(
            'w-[400px] overflow-hidden bg-white border rounded-lg shadow-md',
            isMobile && 'w-full mx-2',
          )}
          direction="col"
        >
          {children}
        </Stack>
      </ProgressPanel>
    </Stack>
  );
};
