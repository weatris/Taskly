import { t } from 'i18next';
import { Stack } from '../../components/basic/Stack/Stack';
import { useRef } from 'react';
import { inputStyle } from '../../common/styles';
import { Button } from '../../components/basic/Button';
import { useNavigate } from 'react-router-dom';
import { useApiMutation } from '../../api/useApiMutation';
import { useNotification } from '../../stateProvider/notification/useNotification';
import { ProgressPanel } from '../../components/StatePanels/ProgressPanel';

export const RecoverPassword = () => {
  const { addNotification } = useNotification();
  const emailRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const { mutate, isLoading } = useApiMutation('sendRecoverPasswordForm', {
    onSuccess: () => {
      addNotification({ title: t('checkEmail') });
    },
    onError: () => {
      addNotification({ title: t('Errors.invalidData') });
    },
  });

  const sendEmail = () => {
    if (!emailRef.current?.value) {
      addNotification({ title: t('Errors.invalidEmail') });
      return;
    }
    mutate({ email: emailRef.current?.value });
  };

  return (
    <Stack className="w-full h-full bg-blue-50" justifyContent="center">
      <ProgressPanel {...{ isLoading }}>
        <Stack
          className="w-[400px] overflow-hidden bg-white border rounded-lg shadow-md"
          direction="col"
        >
          <p className="w-full py-2 bg-gray-50 text-xl text-center border-b">
            {t('RecoverPassword.header')}
          </p>
          <Stack className="w-full p-4 gap-4" direction="col">
            <input
              ref={emailRef}
              placeholder={t('Login.email')}
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
                {t('RecoverPassword.returnToLogin')}
              </button>
            </Stack>
          </Stack>
        </Stack>
      </ProgressPanel>
    </Stack>
  );
};
