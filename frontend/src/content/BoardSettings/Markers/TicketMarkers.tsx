import { useParams } from 'react-router-dom';
import { useApiQuery } from '../../../api/useApiQuery';
import { Stack } from '../../../components/basic/Stack/Stack';
import { useApiMutation } from '../../../api/useApiMutation';
import { useEffect, useState } from 'react';
import { Input } from '../../../components/basic/Input';
import { Textarea } from '../../../components/basic/Textarea';
import { Button } from '../../../components/basic/Button';
import { MarkerListItem } from './MarkerListItem';
import { t } from 'i18next';
import { Icon } from '../../../images/Icon';
import { PencilIcon, TrashIcon } from '../../../images/icons';
import { DeleteMarkerModal } from './DeleteMarkerModal';
import { useNotification } from '../../../stateProvider/notification/useNotification';
import { useStateProvider } from '../../../stateProvider/useStateProvider';
import { permissionControl } from '../../../utils/permissionControl';
import { defaultState, MarkerControlPanel } from './MarkerControlPanel';
import classNames from 'classnames';
import { useScreenDetector } from '../../../utils/useScreenDetector';

export type markerControlType = {
  id?: string;
  name?: string;
  description?: string;
  color?: string;
};

export const Markers = () => {
  const { addNotification } = useNotification();
  const { isMobile } = useScreenDetector();
  const { boardData, userAccess } = useStateProvider().state.board;
  const id = boardData?.id || '';

  const [selectedMarker, setSelectedMarker] = useState<markerControlType>({});
  const [showDeleteMarkerModal, setShowDeleteMarkerModal] = useState(false);

  const { data, refetch } = useApiQuery('getMarkers', [{ id }], {
    onSuccess: () => {
      setSelectedMarker(defaultState);
    },
    onError: () => {
      addNotification({
        title: t('Board.settings.markers.errors.cantGet'),
        tp: 'alert',
      });
    },
  });

  return (
    <>
      <Stack
        className={classNames(
          'h-full px-2 py-3 gap-4 border-r',
          isMobile ? 'w-full' : 'min-w-[350px]',
        )}
        direction="col"
      >
        <p className="text-xl">{t('Board.settings.markers.header')}</p>
        <Stack
          className="w-full h-full min-h-[120px] overflow-y-auto gap-2"
          direction="col"
        >
          {data?.map((item) => (
            <MarkerListItem key={item.id} {...{ item }}>
              {permissionControl({ userAccess, key: 'memberEdit' }) && (
                <>
                  <Icon
                    size="md"
                    onClick={() => {
                      setSelectedMarker({
                        ...item,
                      });
                    }}
                  >
                    <PencilIcon color="gray" />
                  </Icon>
                  <Icon
                    size="md"
                    onClick={() => {
                      setSelectedMarker({ id: item.id });
                      setShowDeleteMarkerModal((prev) => !prev);
                    }}
                  >
                    <TrashIcon color="gray" />
                  </Icon>
                </>
              )}
            </MarkerListItem>
          ))}
        </Stack>

        <MarkerControlPanel
          {...{ selectedMarker, refetch, setSelectedMarker }}
        />
      </Stack>
      <DeleteMarkerModal
        {...{
          isVisible: showDeleteMarkerModal,
          marker: data?.find((item) => item.id == selectedMarker.id),
          onClose: () => {
            setShowDeleteMarkerModal((prev) => !prev);
          },
          onAccept: () => {
            refetch();
          },
        }}
      />
    </>
  );
};
