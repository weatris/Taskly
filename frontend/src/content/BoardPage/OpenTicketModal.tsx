import { useNavigate, useParams } from 'react-router-dom';
import { Modal } from '../../components/Modal';
import Stack from '../../components/Stack/Stack';
import { useApiQuery } from '../../api/useApiQuery';
import { ProgressPanel } from '../../components/StatePanels/ProgressPanel';
import { useNotification } from '../../stateProvider/notification/useNotification';
import { t } from 'i18next';
import { useEffect, useState } from 'react';
import { useApiMutation } from '../../api/useApiMutation';
import { EditableName } from '../../components/EditableName';
import { Icon } from '../../images/Icon';
import RichTextEditor from '../../components/RichTextEditor';
import { Bars3Icon, PencilIcon } from '../../images/icons';
import { Button } from '../../components/Button';
import { useInvalidateQuery } from '../../api/useInvalidateQuery';

const Title = ({ data }: { data: ticketType | undefined }) => {
  const [value, setValue] = useState(data?.name || '');
  const invalidateQuery = useInvalidateQuery();
  const { addNotification } = useNotification();

  const { mutate: handleRename, isLoading } = useApiMutation('renameTicket', {
    onSuccess: () => {
      invalidateQuery('getTicketById');
      invalidateQuery('getBoardById');
    },
    onError: () => {
      addNotification({
        title: t('Tickets.cantUpdate'),
        tp: 'alert',
      });
      setValue(data?.name || '');
    },
  });

  useEffect(() => {
    setValue(data?.name || '');
  }, [data?.name]);

  if (!data) {
    return <></>;
  }

  const handleSave = () => {
    handleRename({ id: data.id, newValue: value });
  };

  return (
    <Stack
      className="h-full h-[40px] gap-2 [&>div]:w-full"
      direction="row"
      justifyContent="center"
      alignItems="center"
    >
      <EditableName
        {...{
          value,
          setValue,
          initValue: value,
          isLoading,
          onClickAway: handleSave,
          className: 'w-full bg-transparent border-none shadow-none',
        }}
      />
    </Stack>
  );
};

const Description = ({
  data,
  refetch,
}: {
  data?: ticketType;
  refetch: () => void;
}) => {
  const [content, setContent] = useState<string>(data?.description || '');
  const [isEditMode, setIsEditMode] = useState(false);
  const { addNotification } = useNotification();

  const { mutate } = useApiMutation('setTicketDescription', {
    onError: () => {
      addNotification({
        title: t('Tickets.cantUpdate'),
        tp: 'alert',
      });
    },
    onSuccess: () => {
      refetch();
      setIsEditMode(false);
    },
  });

  const editDescription = () => {
    if (data?.id)
      mutate({
        id: data?.id,
        newValue: content,
      });
  };

  const cancel = () => {
    setContent(data?.description || '');
    setIsEditMode(false);
  };

  return (
    <Stack className="w-full h-full" direction="col" alignItems="start">
      <Stack
        className="w-full h-[40px] min-h-[40px] px-2 border-b"
        direction="row"
        justifyContent="between"
      >
        <Stack className="w-full" direction="row" alignItems="center">
          <Icon size="md" hoverable={false}>
            <Bars3Icon color="gray" />
          </Icon>
          <p>{t('Tickets.description')}</p>
        </Stack>
        {isEditMode ? (
          <Stack className="gap-2">
            <Button
              {...{
                text: t('common.cancel'),
                variant: 'primary',
                className: 'h-[30px] [&>span]:p-0',
                onClick: cancel,
              }}
            />
            <Button
              {...{
                text: t('common.save'),
                className: 'h-[30px] [&>span]:p-0',
                onClick: editDescription,
              }}
            />
          </Stack>
        ) : (
          <Icon
            size="md"
            onClick={() => {
              setIsEditMode((prev) => !prev);
            }}
          >
            <PencilIcon color="gray" />
          </Icon>
        )}
      </Stack>
      {isEditMode ? (
        <RichTextEditor
          value={content}
          onChange={setContent}
          className="h-[calc(100%-80px)]"
        />
      ) : (
        <div
          className="ql-editor p-1"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      )}
    </Stack>
  );
};

export const OpenTicketModal = () => {
  const { id = '', boardName = '', ticketId = '' } = useParams();
  const { addNotification } = useNotification();
  const navigate = useNavigate();

  const { data, isLoading, refetch } = useApiQuery(
    'getTicketById',
    [{ id: ticketId }],
    {
      enabled: !!ticketId,
      onError: () => {
        addNotification({
          title: t('Tickets.cantLoadError'),
          tp: 'alert',
        });
        navigate(`/boards/${id}`);
      },
    },
  );

  return (
    <Modal
      {...{
        isVisible: !!ticketId,
        title: <Title {...{ data }} />,
        modalType: 'info',
        onClose: () => {
          navigate(`/boards/${id}/${boardName}`);
        },
        titleClasssnames: 'h-[80px]',
      }}
    >
      <ProgressPanel {...{ isLoading }}>
        <Stack className="w-full h-full gap-1" direction="row">
          <Stack className="w-full h-full gap-2" direction="col">
            <Stack className="w-full h-full relative border-[1px]">
              <Description
                {...{
                  data,
                  refetch: () => {
                    refetch();
                  },
                }}
              />
            </Stack>
          </Stack>
          <Stack
            className="w-[400px] !min-w-[400px] !max-w-[400px] h-full p-2 border-[1px]"
            direction="col"
            alignItems="start"
          >
            <Stack
              className="w-full h-fit p-1 rounded-md border-b"
              direction="row"
              alignItems="center"
            >
              <p className="truncate">
                {t('Tickets.groupBtn')} {data?.groupName}
              </p>
            </Stack>
          </Stack>
        </Stack>
      </ProgressPanel>
    </Modal>
  );
};
