import { t } from 'i18next';
import { useApiMutation } from '../../../api/useApiMutation';
import { markerType } from '../../../common/typing';
import { useNotification } from '../../../stateProvider/notification/useNotification';
import { Modal } from '../../../components/basic/Modal';
import { MarkerListItem } from './MarkerListItem';
import { ProgressPanel } from '../../../components/StatePanels/ProgressPanel';

export const DeleteMarkerModal = ({
  isVisible,
  marker,
  onClose,
  onAccept,
}: {
  isVisible: boolean;
  marker?: markerType;
  onClose: () => void;
  onAccept: () => void;
}) => {
  const { addNotification } = useNotification();

  const { mutate } = useApiMutation('deleteMarker', {
    onSuccess: () => {
      onAccept();
      onClose();
    },
    onError: () => {
      addNotification({
        title: t('Board.settings.markers.errors.cantDelete'),
        tp: 'alert',
      });
    },
  });

  return (
    <Modal
      {...{
        title: t('Board.settings.markers.delete'),
        modalType: 'modal',
        isVisible,
        onClose,
        onAccept: () => {
          !!marker?.id && mutate({ id: marker.id, boardId: marker.boardId });
        },
      }}
    >
      <ProgressPanel isLoading={!marker}>
        <p className="w-full my-2 truncate">
          {t('Board.settings.markers.deleteText')}
        </p>
        <MarkerListItem {...{ item: marker }} />
      </ProgressPanel>
    </Modal>
  );
};
