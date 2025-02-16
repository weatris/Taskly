import { useEffect, useRef, useState } from 'react';
import Stack from '../../../components/Stack/Stack';
import { Icon } from '../../../images/Icon';
import { ChevronUpIcon, PencilIcon } from '../../../images/icons';
import { useStateProvider } from '../../../stateProvider/useStateProvider';
import { MarkerListItem } from '../../BoardSettings/Markers/MarkerListItem';
import { Checkbox } from '../../../components/Checkbox';
import { useClickAway } from 'react-use';
import { haveSameElements } from '../../../utils/utils';
import { useNotification } from '../../../stateProvider/notification/useNotification';
import { t } from 'i18next';
import { Button } from '../../../components/Button';
import { useApiMutation } from '../../../api/useApiMutation';
import { useInvalidateQuery } from '../../../api/useInvalidateQuery';
import { MarkerBadge } from '../../../components/Markers/MarkerBadge';
import { ProgressPanel } from '../../../components/StatePanels/ProgressPanel';

export const TicketMarkers = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const invalidateQuery = useInvalidateQuery();
  const { addNotification } = useNotification();
  const { markers, openTicketData } = useStateProvider().state.board;
  const ticketMarkers = openTicketData?.markers || [];
  const [selectedMarkers, setSelectedMarkers] =
    useState<string[]>(ticketMarkers);
  const isChanged = !haveSameElements(ticketMarkers, selectedMarkers);

  const { mutate, isLoading } = useApiMutation('changeTicketMarkers', {
    onSuccess: () => {
      invalidateQuery('getTicketById');
      invalidateQuery('getBoardById');
      setIsOpen(false);
    },
    onError: () => {
      addNotification({
        title: t('Tickets.errors.cantUpdate'),
        tp: 'info',
      });
    },
  });

  const handleSelect = (id: string) => {
    if (selectedMarkers.includes(id)) {
      setSelectedMarkers(selectedMarkers.filter((item) => item !== id));
    } else {
      setSelectedMarkers([...selectedMarkers, id]);
    }
  };

  const onSubmit = () => {
    if (openTicketData?.id)
      mutate({
        id: openTicketData?.id,
        newValue: selectedMarkers,
      });
  };

  useClickAway(ref, () => {
    if (!isOpen) {
      return;
    }
    if (isChanged) {
      addNotification({
        title: t('Tickets.saveChanges'),
        tp: 'info',
      });
    } else {
      setIsOpen(false);
    }
  });

  useEffect(() => {
    setSelectedMarkers(ticketMarkers);
  }, [isOpen, ticketMarkers.map((item) => item).join('')]);

  return (
    <div ref={ref} className="w-full relative flex flex-col">
      <Stack
        className="w-full p-2 border"
        justifyContent="between"
        alignItems="center"
      >
        <ProgressPanel {...{ isLoading }}>
          {!!selectedMarkers.length ? (
            <Stack
              className="w-full h-auto max-h-[150px] flex-wrap overflow-y-auto overflow-x-hidden scrollbar-thin px-1 pt-1 gap-2"
              direction="row"
              alignItems="center"
              wrap="wrap"
            >
              {markers
                .filter((item) => selectedMarkers.includes(item.id))
                .map((item) => (
                  <MarkerBadge key={item.id} {...{ item }} />
                ))}
            </Stack>
          ) : (
            <p>{t('Tickets.markers')}</p>
          )}
          {!isChanged && (
            <Icon
              size="md"
              className="ml-auto"
              onClick={() => {
                setIsOpen((prev) => !prev);
              }}
            >
              {isOpen ? (
                <ChevronUpIcon color="gray" />
              ) : (
                <PencilIcon color="gray" />
              )}
            </Icon>
          )}
          {isChanged && (
            <Button
              {...{
                className: 'py-1',
                text: t('common.save'),
                size: 'sm',
                onClick: onSubmit,
              }}
            />
          )}
        </ProgressPanel>
      </Stack>
      {isOpen && (
        <Stack
          className="w-full h-[140px] absolute top-[60px] z-[2] right-0 left-0 overflow-y-scroll p-2 gap-1 bg-white shadow-md border"
          direction="col"
          alignItems="end"
        >
          {markers.map((item) => (
            <Stack key={item.id} className="w-full gap-2">
              <MarkerListItem {...{ item, childrenFirst: true }}>
                <Checkbox
                  {...{
                    value: ticketMarkers.includes(item.id),
                    onClick: () => {
                      handleSelect(item.id);
                    },
                  }}
                />
              </MarkerListItem>
            </Stack>
          ))}
        </Stack>
      )}
    </div>
  );
};
