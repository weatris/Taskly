import { Bars3Icon, PencilIcon } from '@heroicons/react/24/solid';
import { t } from 'i18next';
import { useState } from 'react';
import { useApiMutation } from '../../../api/useApiMutation';
import RichTextEditor from '../../../components/RichTextEditor';
import Stack from '../../../components/Stack/Stack';
import { Icon } from '../../../images/Icon';
import { useNotification } from '../../../stateProvider/notification/useNotification';
import { Button } from '../../../components/Button';

export const Description = ({
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
        title: t('Tickets.errors.cantUpdate'),
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
    <Stack
      className="w-full h-[calc(100%-40px)]"
      direction="col"
      alignItems="start"
    >
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
                className: 'px-0 py-1',
                variant: 'primary',
                size: 'sm',
                onClick: cancel,
              }}
            />
            <Button
              {...{
                text: t('common.save'),
                className: 'px-0 py-1',
                size: 'sm',
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
          className="h-full"
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
