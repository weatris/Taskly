import classNames from 'classnames';
import { Icon } from '../images/Icon';
import { XMarkIcon } from '../images/icons';
import { Button } from './Button';
import Stack from './Stack/Stack';
import { t } from 'i18next';

export const Modal = ({
  isVisible,
  title,
  onClose,
  onAccept,
  children,
  modalType = 'sidebar',
}: {
  isVisible?: boolean;
  title: string | React.ReactNode;
  onClose: () => void;
  onAccept: () => void;
  children?: React.ReactNode;
  modalType?: 'modal' | 'sidebar';
}) => {
  if (!isVisible) {
    return <></>;
  }

  return (
    <>
      <div className="w-full h-full absolute top-0 left-0 right-0 bottom-0 bg-gray-500 opacity-25" />
      <Stack
        className="w-full h-full absolute top-0 left-0 right-0 bottom-0"
        direction="col"
        alignItems={modalType == 'modal' ? 'center' : 'end'}
        justifyContent="center"
      >
        <Stack
          className={classNames(
            'bg-white overflow-hidden',
            modalType == 'modal'
              ? 'w-[350px] rounded-lg border'
              : 'w-[400px] h-full border-l-3',
          )}
          direction="col"
          alignItems="start"
        >
          <Stack
            className={classNames(
              'w-full pl-4 pr-2 relative bg-gray-100 border-b',
              modalType == 'modal' ? 'h-[40px]' : 'h-[60px]',
            )}
            direction="row"
          >
            <p className="w-full text-xl truncate">{title}</p>
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
                onAccept();
              }}
            />
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};
