import { t } from 'i18next';
import { Stack } from '../../../components/basic/Stack/Stack';
import { permissionControl } from '../../../utils/permissionControl';
import { Input } from '../../../components/basic/Input';
import { SetStateAction, useEffect, useState } from 'react';
import { useStateProvider } from '../../../stateProvider/useStateProvider';
import { Textarea } from '../../../components/basic/Textarea';
import { Button } from '../../../components/basic/Button';
import { useApiMutation } from '../../../api/useApiMutation';
import { markerControlType } from './TicketMarkers';
import { useNotification } from '../../../stateProvider/notification/useNotification';

export const defaultState: markerControlType = {
  color: '#000000',
  name: '',
  description: '',
};

export const MarkerControlPanel = ({
  selectedMarker,
  refetch,
  setSelectedMarker,
}: {
  selectedMarker: markerControlType;
  refetch: () => void;
  setSelectedMarker: (value: SetStateAction<markerControlType>) => void;
}) => {
  const { addNotification } = useNotification();
  const { boardData, userAccess } = useStateProvider().state.board;
  const id = boardData?.id || '';

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState('');

  const { mutate: createMarker } = useApiMutation('createMarker', {
    onSuccess: () => {
      clearFields();
      refetch();
    },
    onError: () => {
      addNotification({
        title: t('Board.settings.markers.errors.cantCreate'),
        tp: 'alert',
      });
    },
  });
  const { mutate: updateMarker } = useApiMutation('updateMarker', {
    onSuccess: () => {
      clearFields();
      refetch();
    },
    onError: () => {
      addNotification({
        title: t('Board.settings.markers.errors.cantUpdate'),
        tp: 'alert',
      });
    },
  });

  const onSubmit = () => {
    if (selectedMarker?.id) {
      updateMarker({
        id,
        name,
        description,
        color,
        selectedMarker: selectedMarker.id,
      });
    } else {
      createMarker({
        id,
        name,
        description,
        color,
      });
    }
  };

  const clearFields = () => {
    setName(defaultState.name || '');
    setDescription(defaultState.description || '');
    setColor(defaultState.color || '');
  };

  useEffect(() => {
    if (selectedMarker.id) {
      setName(selectedMarker.name || '');
      setDescription(selectedMarker.description || '');
      setColor(selectedMarker.color || '');
    } else {
      clearFields();
    }
  }, [selectedMarker.id]);

  return (
    <>
      {permissionControl({ userAccess, key: 'memberEdit' }) && (
        <Stack className="w-full h-[480px] gap-2 py-2" direction="col">
          <p className="text-xl">
            {t(
              selectedMarker?.id
                ? 'Board.settings.markers.update'
                : 'Board.settings.markers.create',
            )}
          </p>
          <Input
            {...{
              value: name,
              setValue: setName,
              className: 'border-[1px]',
              placeholder: t('Board.settings.markers.name'),
            }}
          />
          <Textarea
            {...{
              value: description,
              setValue: setDescription,
              className: '!h-[120px]',
              placeholder: t('Board.settings.markers.description'),
            }}
          />
          <Stack className="w-full gap-2" direction="row">
            <Input
              {...{
                value: color,
                setValue: setColor,
                className: '!w-[50px] !p-0',
                type: 'color',
              }}
            />
            <Input
              {...{
                value: color,
                setValue: setColor,
                className: 'border-[1px]',
                type: 'text',
              }}
            />
          </Stack>
          <Stack className="w-full gap-2" direction="row">
            {!!selectedMarker.id && (
              <Button
                {...{
                  text: t('common.cancel'),
                  variant: 'primary',
                  className: 'w-full',
                  onClick: () => {
                    setSelectedMarker(defaultState);
                    clearFields();
                  },
                }}
              />
            )}
            <Button
              {...{
                text: selectedMarker.id ? t('common.save') : t('common.create'),
                className: 'w-full',
                onClick: onSubmit,
                disabled: !name,
              }}
            />
          </Stack>
        </Stack>
      )}
    </>
  );
};
