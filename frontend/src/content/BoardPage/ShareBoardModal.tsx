import { t } from 'i18next';
import { Modal } from '../../components/Modal';
import Stack from '../../components/Stack/Stack';
import { useApiQuery } from '../../api/useApiQuery';
import { Button } from '../../components/Button';
import { useApiMutation } from '../../api/useApiMutation';
import { useNotification } from '../../stateProvider/notification/useNotification';
import { Spinner } from '../../components/Spinner';
import { ProgressPanel } from '../../components/StatePanels/ProgressPanel';
import { useStateProvider } from '../../stateProvider/useStateProvider';

export const ShareBoardModal = () => {
  const { addNotification } = useNotification();
  const { state, actions } = useStateProvider();
  const { shareBoardId: id } = state.board;
  const { setShareBoardId } = actions;
  const show = !!id;

  const {
    data,
    isLoading: isDataLoading,
    refetch,
  } = useApiQuery('getBoardShareLink', [{ id }], {
    enabled: !!show,
  });

  const { mutate: mutateCreateBoardShareLink, isLoading } = useApiMutation(
    'createBoardShareLink',
    {
      onSuccess: () => {
        refetch();
      },
      onError: () => {
        addNotification({
          title: t('Groups.cantCreate'),
          tp: 'alert',
        });
      },
    },
  );

  const { mutate: mutateDeleteBoardShareLink } = useApiMutation(
    'createDeleteShareLink',
    {
      onSuccess: () => {
        refetch();
      },
      onError: () => {
        addNotification({
          title: t('Groups.cantCreate'),
          tp: 'alert',
        });
      },
    },
  );

  const copyLink = () => {
    navigator.clipboard.writeText(
      window.location.origin + `/board_share/${id}/${data?.value}`,
    );
    addNotification({
      title: t('Board.linkCopied'),
      tp: 'success',
    });
  };

  const onClose = () => {
    setShareBoardId('');
  };

  return (
    <Modal
      {...{
        isVisible: show,
        modalType: 'modal',
        title: t('Board.share'),
        onClose,
        showButtons: false,
      }}
    >
      <ProgressPanel {...{ isLoading: isDataLoading }}>
        <Stack
          className="w-full h-full gap-4"
          direction="col"
          alignItems="start"
        >
          <p>{t('Board.linkActiveFor', { lifetime: data?.lifetime })}</p>
          {isLoading ? (
            <Stack className="w-full h-[50px]">
              <Spinner size="sm" />
            </Stack>
          ) : data?.value ? (
            <Stack
              className="w-full h-[50px] gap-2"
              direction="row"
              alignItems="center"
            >
              <Button
                {...{
                  className: 'w-full',
                  text: t('Board.deleteLink'),
                  variant: 'primary',
                  onClick: () => {
                    mutateDeleteBoardShareLink({ id });
                  },
                }}
              />
              <Button
                {...{
                  className: 'w-full',
                  text: t('Board.copyLink'),
                  onClick: copyLink,
                }}
              />
            </Stack>
          ) : (
            <Stack className="w-full h-[50px]">
              <Button
                {...{
                  className: 'w-full',
                  text: t('Board.createLink'),
                  variant: 'primary',
                  onClick: () => {
                    mutateCreateBoardShareLink({ id });
                  },
                }}
              />
            </Stack>
          )}
        </Stack>
      </ProgressPanel>
    </Modal>
  );
};
