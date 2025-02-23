import classNames from 'classnames';
import { Icon } from '../images/Icon';
import { XMarkIcon } from '../images/icons';
import { Button } from './Button';
import { Stack } from './Stack/Stack';
import { t } from 'i18next';
import { defaultTextStyle } from '../common/styles';

export const Modal = ({
  isVisible,
  title,
  onClose,
  onAccept,
  children,
  modalType = 'sidebar',
  titleClasssnames = '',
  showButtons = true,
}: {
  isVisible?: boolean;
  title: string | React.ReactNode;
  onClose: () => void;
  onAccept?: () => void;
  children?: React.ReactNode;
  modalType?: 'info' | 'modal' | 'sidebar';
  titleClasssnames?: string;
  showButtons?: boolean;
}) => {
  if (!isVisible) {
    return <></>;
  }

  const alignItems = {
    info: 'center',
    modal: 'center',
    sidebar: 'end',
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
          className={classNames(
            'bg-white overflow-hidden',
            modalType == 'modal' && 'w-[350px] rounded-lg border',
            modalType == 'sidebar' && 'w-[400px] h-full border-l-3',
            modalType == 'info' && 'w-[60%] h-[80%] rounded-lg border',
          )}
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
            <Icon onClick={onClose}>
              <XMarkIcon color="gray" />
            </Icon>
          </Stack>
          {children && (
            <div
              className={classNames(
                'w-full p-4',
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
                }}
              />
              <Button
                className="w-full"
                text={t('common.submit')}
                onClick={() => {
                  onAccept?.();
                }}
              />
            </Stack>
          )}
        </Stack>
      </Stack>
    </>
  );
};
