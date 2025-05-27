import classNames from 'classnames';
import { Icon } from '../../images/Icon';
import { XMarkIcon } from '../../images/icons';
import { Button } from './Button';
import { Stack } from './Stack/Stack';
import { t } from 'i18next';
import { defaultTextStyle } from '../../common/styles';
import { useScreenDetector } from '../../utils/useScreenDetector';

const alignItems = {
  info: 'center',
  modal: 'center',
  sidebar: 'end',
};

export const Modal = ({
  isVisible,
  title,
  onClose,
  onAccept,
  children,
  modalType = 'sidebar',
  titleClasssnames = '',
  showButtons = true,
  dataTestIdPrefix='modal'
}: {
  isVisible?: boolean;
  title: string | React.ReactNode;
  onClose: () => void;
  onAccept?: () => void;
  children?: React.ReactNode;
  modalType?: 'info' | 'modal' | 'sidebar';
  titleClasssnames?: string;
  showButtons?: boolean;
  dataTestIdPrefix?: string;
}) => {
  if (!isVisible) {
    return <></>;
  }

  const { isMobile, isTablet } = useScreenDetector();

  const styles = {
    modal: 'w-[350px] rounded-lg border',
    sidebar: classNames('w-[400px] h-full border-l-3', isMobile && 'w-full'),
    info: classNames(
      'w-[60%] h-[80%] rounded-lg border',
      isTablet && 'w-full h-full rounded-none',
    ),
  };

  return (
    <>
      <div className="w-full h-full absolute top-0 left-0 right-0 bottom-0 z-[1] bg-gray-500 opacity-25" />
      <Stack
        className="w-full h-full absolute top-0 left-0 right-0 bottom-0 z-[2]"
        direction="col"
        alignItems={alignItems[modalType] as any}
        justifyContent="center"
      >
        <Stack
          className={classNames('bg-white overflow-hidden', styles[modalType])}
          direction="col"
          alignItems="start"
        >
          <Stack
            className={classNames(
              'w-full pl-4 pr-2 relative bg-gray-100 border-b',
              modalType == 'modal' ? 'h-[40px]' : 'h-[60px]',
              titleClasssnames,
            )}
            direction="row"
          >
            <div className={classNames(defaultTextStyle, 'text-xl')}>
              {title}
            </div>
            <Icon onClick={onClose} dataTestId={`${dataTestIdPrefix}_closeIcon`}>
              <XMarkIcon color="gray" />
            </Icon>
          </Stack>
          {children && (
            <div
              className={classNames(
                'w-full',
                isMobile ? 'p-2' : 'p-4',
                modalType != 'modal' && 'h-full',
              )}
            >
              {children}
            </div>
          )}
          {modalType !== 'info' && showButtons && (
            <Stack className="w-full p-2 gap-2 border-t">
              <Button
                className="w-full"
                text={t('common.cancel')}
                variant="primary"
                onClick={() => {
                  onClose();
                }} dataTestId={`${dataTestIdPrefix}_closeModal`}
              />
              <Button
                className="w-full"
                text={t('common.submit')}
                onClick={() => {
                  onAccept?.();
                }}
                dataTestId={`${dataTestIdPrefix}_submit`}
              />
            </Stack>
          )}
        </Stack>
      </Stack>
    </>
  );
};
