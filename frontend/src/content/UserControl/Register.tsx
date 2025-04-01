import { t } from 'i18next';
import { Button } from '../../components/basic/Button';
import { Stack } from '../../components/basic/Stack/Stack';
import { useNotification } from '../../stateProvider/notification/useNotification';
import { useRef } from 'react';
import { useApiMutation } from '../../api/useApiMutation';
import { useStateProvider } from '../../stateProvider/useStateProvider';
import { inputStyle } from '../../common/styles';
import { useNavigate } from 'react-router-dom';
import { FloatingPanel } from './FloatingPanel';

export const Register = ({ toggleMode }: { toggleMode: () => void }) => {
  const { addNotification } = useNotification();
  const navigate = useNavigate();

  const { setAuthData } = useStateProvider().actions;
  const emailRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  const { mutate, isLoading } = useApiMutation('createUser', {
    onSuccess: (data) => {
      setAuthData(data);
    },
    onError: () => {
      addNotification({ title: t('Errors.invalidData') });
    },
  });

  const onSubmit = () => {
    const email = emailRef.current?.value;
    const name = nameRef.current?.value;
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

    if (!name || name.trim() === '') {
      addNotification({
        title: t('Errors.emptyName'),
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

    mutate({ params: { email, name, password } });
  };

  return (
    <FloatingPanel {...{ isLoading }}>
      <p className="w-full py-2 bg-gray-50 text-xl text-center border-b">
        {t('Register.header')}
      </p>
      <Stack className="w-full p-4 gap-4" direction="col">
        <input
          ref={emailRef}
          placeholder={t('Register.email')}
          className={inputStyle}
        />
        <input
          ref={nameRef}
          placeholder={t('Register.name')}
          className={inputStyle}
        />
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
        <Stack
          className="w-full gap-2 [&>button]:text-blue-500"
          direction="row"
          justifyContent="between"
        >
          <button
            onClick={() => {
              navigate('/restore_account');
            }}
          >
            {t('Register.restoreAccount')}
          </button>
          <div className="w-[1px] h-[15px] bg-gray-300" />
          <button onClick={toggleMode}>{t('Register.haveAccount')}</button>
        </Stack>
      </Stack>
    </FloatingPanel>
  );
};
