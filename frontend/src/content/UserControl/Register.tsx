import { t } from 'i18next';
import { Button } from '../../components/Button';
import Stack from '../../components/Stack/Stack';
import { useNotification } from '../../stateProvider/notification/useNotification';
import { useRef } from 'react';
import { useApiMutation } from '../../api/useApiMutation';
import { useStateProvider } from '../../stateProvider/useStateProvider';
import { inputStyle } from '../../common/styles';

export const Register = ({ toggleMode }: { toggleMode: () => void }) => {
  const { addNotification } = useNotification();
  const { setAuthData } = useStateProvider().actions;
  const emailRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  const { mutate } = useApiMutation('createUser', {
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
        title: 'Invalid email address',
        tp: 'alert',
      });
      return;
    }

    if (!name || name.trim() === '') {
      addNotification({
        title: 'Name cannot be empty',
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
        title: 'Passwords do not match',
        tp: 'alert',
      });
      return;
    }

    mutate({ params: { email, name, password } });
  };

  return (
    <Stack className="w-full h-full bg-blue-50" justifyContent="center">
      <Stack
        className="w-[400px] overflow-hidden bg-white border rounded-lg shadow-md"
        direction="col"
      >
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
          <button className="text-blue-500 ml-auto" onClick={toggleMode}>
            {t('Register.haveAccount')}
          </button>
        </Stack>
      </Stack>
    </Stack>
  );
};
