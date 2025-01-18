import { useParams } from 'react-router-dom';
import { useApiQuery } from '../../api/useApiQuery';
import Stack from '../../components/Stack/Stack';
import { useApiMutation } from '../../api/useApiMutation';
import { useEffect, useState } from 'react';
import { Input } from '../../components/Input';
import { Textarea } from '../../components/Textarea';
import { Button } from '../../components/Button';
import { MarkerListItem } from './MarkerListItem';
import { t } from 'i18next';
import { Icon } from '../../images/Icon';
import { PencilIcon, TrashIcon } from '../../images/icons';
import { DeleteMarkerModal } from './DeleteMarkerModal';
import { useNotification } from '../../stateProvider/notification/useNotification';

const defaultState = {
  color: '#000000',
  name: '',
  description: '',
};

export const TicketMarkers = () => {
  const { id = '' } = useParams();
  const { addNotification } = useNotification();

  const [selectedMarker, setSelectedMarker] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState('');
  const [showDeleteMarkerModal, setShowDeleteMarkerModal] = useState(false);

  const clearFields = () => {
    setName(defaultState.name);
    setDescription(defaultState.description);
    setColor(defaultState.color);
  };

  const { data, refetch } = useApiQuery('getMarkers', [{ id }], {
    onError: () => {
      addNotification({
        title: t('Board.settings.markers.errors.cantGet'),
        tp: 'alert',
      });
    },
  });

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
    if (selectedMarker) {
      updateMarker({
        id,
        name,
        description,
        color,
        selectedMarker,
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

  useEffect(() => {
    clearFields();
  }, []);

  return (
    <>
      <Stack className="w-[300px] h-full p-2 gap-2 border-r" direction="col">
        <p className="text-xl">{t('Board.settings.markers.header')}</p>
        <Stack className="w-full h-full gap-2" direction="col">
          {data?.map((item) => (
            <MarkerListItem {...{ item }}>
              <Icon
                size="md"
                onClick={() => {
                  setSelectedMarker(item.id);
                  setName(item.name);
                  setDescription(item.description);
                  setColor(item.color);
                }}
              >
                <PencilIcon color="gray" />
              </Icon>
              <Icon
                size="md"
                onClick={() => {
                  setSelectedMarker(item.id);
                  setShowDeleteMarkerModal((prev) => !prev);
                }}
              >
                <TrashIcon color="gray" />
              </Icon>
            </MarkerListItem>
          ))}
        </Stack>

        <Stack className="w-full gap-2" direction="col">
          <p className="text-xl">
            {t(
              selectedMarker
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
              className: '!h-[120px] border-[1px]',
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
            {!!selectedMarker && (
              <Button
                {...{
                  text: t('common.cancel'),
                  variant: 'primary',
                  className: 'w-full',
                  onClick: () => {
                    setSelectedMarker('');
                    clearFields();
                  },
                }}
              />
            )}
            <Button
              {...{
                text: selectedMarker ? t('common.save') : t('common.create'),
                className: 'w-full',
                onClick: onSubmit,
                disabled: !name,
              }}
            />
          </Stack>
        </Stack>
      </Stack>
      <DeleteMarkerModal
        {...{
          isVisible: showDeleteMarkerModal,
          marker: data?.find((item) => item.id == selectedMarker),
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
