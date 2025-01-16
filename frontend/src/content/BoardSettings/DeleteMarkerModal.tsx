import { t } from 'i18next';
import { Modal } from '../../components/Modal';
import { useApiMutation } from '../../api/useApiMutation';

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
  const { mutate } = useApiMutation('deleteMarker', {
    onSuccess: () => {
      onAccept();
      onClose();
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
      {t('Board.settings.markers.deleteText', { name: marker?.name })}
    </Modal>
  );
};
