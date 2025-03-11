import { t } from 'i18next';
import { Stack } from '../../components/basic/Stack/Stack';
import { useEffect, useRef, useState } from 'react';
import { inputStyle } from '../../common/styles';
import { Button } from '../../components/basic/Button';
import { useNavigate, useParams } from 'react-router-dom';
import { useApiMutation } from '../../api/useApiMutation';
import { useNotification } from '../../stateProvider/notification/useNotification';
import { ProgressPanel } from '../../components/StatePanels/ProgressPanel';

export const ChangePassword = () => {
  const { id = '' } = useParams();
  const [isValidated, setIsValidated] = useState(false);
  const { addNotification } = useNotification();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  const { mutate: validateRecoverPasswordFormMutate, isLoading } =
    useApiMutation('validateRecoverPasswordForm', {
      onSuccess: (data) => {
        setIsValidated(true);
        setEmail(data);
      },
      onError: () => {
        addNotification({ title: t('Errors.default') });
      },
    });

  const { mutate: changePasswordMutate } = useApiMutation('changePassword', {
    onSuccess: () => {
      navigate('/');
    },
    onError: () => {
      addNotification({ title: t('Errors.default') });
    },
  });

  useEffect(() => {
    if (id) {
      validateRecoverPasswordFormMutate({ id });
    }
  }, [id]);

  const onSubmit = () => {
    const password = passwordRef.current?.value;
    const confirmPassword = confirmPasswordRef.current?.value;

    if (
      !email ||
      !email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
    ) {
      addNotification({
        title: t('Errors.invalidEmail'),
        tp: 'alert',
      });
      return;
    }

    if (
      !password ||
      password.length < 8 ||
      !password.match(/\d/) ||
      !password.match(/[!@#$%^&*(),.?":{}|<>-_+=]/)
    ) {
      addNotification({
        title:
          'Password must have at least 8 characters, 1 number, and 1 special character',
        tp: 'info',
      });
      return;
    }

    if (password !== confirmPassword) {
      addNotification({
        title: t('Errors.passwordsDontMatch'),
        tp: 'alert',
      });
      return;
    }

    changePasswordMutate({ email, password });
  };

  return (
    <ProgressPanel {...{ isLoading: !isValidated || isLoading }}>
      <Stack className="w-full h-full bg-blue-50" justifyContent="center">
        <Stack
          className="w-[400px] overflow-hidden bg-white border rounded-lg shadow-md"
          direction="col"
        >
          <p className="w-full py-2 bg-gray-50 text-xl text-center border-b">
            {t('RecoverPassword.header')}
          </p>
          <Stack className="w-full p-4 gap-4" direction="col">
            <input
              type="password"
              ref={passwordRef}
              placeholder={t('Register.password')}
              className={inputStyle}
            />
            <input
              type="password"
              ref={confirmPasswordRef}
              placeholder={t('Register.confirmPassword')}
              className={inputStyle}
            />
            <Button
              className="w-full"
              text={t('common.submit')}
              onClick={onSubmit}
            />
          </Stack>
        </Stack>
      </Stack>
    </ProgressPanel>
  );
};
