import { useEffect, useState } from 'react';
import { Input } from '../../components/basic/Input';
import { Stack } from '../../components/basic/Stack/Stack';
import { useStateProvider } from '../../stateProvider/useStateProvider';
import { Button } from '../../components/basic/Button';
import { t } from 'i18next';
import { useApiMutation } from '../../api/useApiMutation';
import { ProgressPanel } from '../../components/StatePanels/ProgressPanel';
import { Modal } from '../../components/basic/Modal';
import classNames from 'classnames';
import { useScreenDetector } from '../../utils/useScreenDetector';
import { useNavigate } from 'react-router-dom';

const refreshPage = () => {
  localStorage.removeItem('authData');
  window.location.reload();
};

export const UserPage = () => {
  const navigate = useNavigate();
  const { auth } = useStateProvider().state;
  const [name, setName] = useState(auth.name);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { isMobile } = useScreenDetector();

  useEffect(() => {
    setName(auth.name);
  }, [auth.name]);

  const { mutate: updateUserMutate, isLoading: updateUserIsLoading } =
    useApiMutation('updateUser', {
      onSuccess: refreshPage,
    });

  const { mutate: deleteUser, isLoading: deleteUserIsLoading } = useApiMutation(
    'deleteUser',
    {
      onSuccess: () => {
        setShowDeleteModal(false);
        refreshPage();
      },
    },
  );

  const updateUser = () => {
    updateUserMutate({ params: { name } });
  };

  return (
    <>
      <ProgressPanel
        {...{ isLoading: updateUserIsLoading || deleteUserIsLoading }}
      >
        <Stack className="w-full h-full p-5" direction="col">
          <Stack
            className={classNames(
              'h-full border rounded-lg',
              isMobile ? 'w-full' : 'w-[500px]',
            )}
            direction="col"
            alignItems="start"
          >
            <p className="w-full p-3 rounded-t-lg bg-gray-100">
              {t('manageUser.title')}
            </p>

            <Stack
              className="w-full h-full px-3 py-10"
              direction="col"
              alignItems="start"
              justifyContent="between"
            >
              <Stack className="w-full gap-2" direction="col" alignItems="end">
                <Input {...{ value: name, setValue: setName }} />
                {
                  <Button
                    {...{
                      text: t('common.save'),
                      onClick: updateUser,
                      disabled: auth.name === name || !name,
                    }}
                  />
                }
              </Stack>

              <Stack
                className="w-full gap-2"
                direction="row"
                justifyContent="between"
              >
                <Button
                  {...{
                    dataTestId: "cancel",
                    text: t('common.cancel'),
                    variant: 'secondary',
                    onClick: () => {
                      navigate('/');
                    },
                  }}
                />
                <Button
                  {...{
                    text: t('manageUser.deleteUser'),
                    variant: 'secondary',
                    onClick: () => {
                      setShowDeleteModal(true);
                    },
                  }}
                />
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </ProgressPanel>
      <Modal
        {...{
          modalType: 'modal',
          title: t('manageUser.deleteUser'),
          isVisible: showDeleteModal,
          onClose: () => {
            setShowDeleteModal(false);
          },
          onAccept: () => {
            deleteUser({});
          },
        }}
      >
        <p>{t('manageUser.deleteUserConfirm')}</p>
      </Modal>
    </>
  );
};
