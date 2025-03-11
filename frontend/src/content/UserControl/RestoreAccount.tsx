import { t } from 'i18next';
import { Stack } from '../../components/basic/Stack/Stack';
import { useEffect, useState } from 'react';
import { inputStyle } from '../../common/styles';
import { Button } from '../../components/basic/Button';
import { useNavigate, useParams } from 'react-router-dom';
import { useApiMutation } from '../../api/useApiMutation';
import { useNotification } from '../../stateProvider/notification/useNotification';
import { ProgressPanel } from '../../components/StatePanels/ProgressPanel';

export const RestoreAccount = () => {
  const { id = '' } = useParams();
  const { addNotification } = useNotification();
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const { mutate, isLoading: isLoadingSendRestoreAccountForm } = useApiMutation(
    'sendRestoreAccountForm',
    {
      onSuccess: () => {
        addNotification({ title: t('common.checkEmail') });
        navigate('/');
      },
      onError: () => {
        addNotification({ title: t('Errors.invalidData') });
      },
    },
  );

  const {
    mutate: validateRestoreAccountForm,
    isLoading: isLoadingValidateRestoreAccountForm,
  } = useApiMutation('validateRestoreAccountForm', {
    onSuccess: () => {
      addNotification({ title: t('common.checkEmail') });
      navigate('/');
    },
    onError: () => {
      addNotification({ title: t('Errors.invalidData') });
      navigate('/restore_account');
    },
  });

  const sendEmail = () => {
    if (!email) {
      addNotification({ title: t('Errors.invalidEmail') });
      return;
    }
    mutate({ email });
  };

  useEffect(() => {
    id && validateRestoreAccountForm({ id });
  }, [id]);

  return (
    <Stack className="w-full h-full bg-blue-50" justifyContent="center">
      <ProgressPanel
        {...{
          isLoading:
            isLoadingSendRestoreAccountForm ||
            isLoadingValidateRestoreAccountForm,
        }}
      >
        <Stack
          className="w-[400px] overflow-hidden bg-white border rounded-lg shadow-md"
          direction="col"
        >
          <p className="w-full py-2 bg-gray-50 text-xl text-center border-b">
            {t('RestoreAccount.header')}
          </p>
          <Stack className="w-full p-4 gap-4" direction="col">
            <input
              placeholder={t('Login.email')}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className={inputStyle}
            />
            <Button
              className="w-full"
              text={t('common.submit')}
              onClick={sendEmail}
            />
            <Stack
              className="w-full px-2"
              direction="row"
              alignItems="center"
              justifyContent="between"
            >
              <button
                className="text-blue-500 ml-auto"
                onClick={() => {
                  navigate('/');
                }}
              >
                {t('RestoreAccount.returnToLogin')}
              </button>
            </Stack>
          </Stack>
        </Stack>
      </ProgressPanel>
    </Stack>
  );
};
