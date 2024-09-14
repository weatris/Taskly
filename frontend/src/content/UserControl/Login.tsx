import { t } from 'i18next';
import { Button } from '../../components/Button';
import Stack from '../../components/Stack/Stack';
import { useNotification } from '../../stateProvider/notification/useNotification';
import { useRef } from 'react';
import { useApiMutation } from '../../api/useApiMutation';
import { useStateProvider } from '../../stateProvider/useStateProvider';

const inputStyle =
  'w-full p-2 border rounded-md border-gray-200 focus:border-gray-300 outline-none';

export const Login = ({ toggleMode }: { toggleMode: () => void }) => {
  const { addNotification } = useNotification();
  const { setAuthData } = useStateProvider().actions;
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const { mutate } = useApiMutation('login', {
    onSuccess: (data) => {
      localStorage.setItem('authData', JSON.stringify(data));
      setAuthData(data);
    },
    onError: () => {
      addNotification({ title: t('Errors.invalidData') });
    },
  });

  // const { mutate } = useApiMutation('refreshToken', {
  //   onError: (error) => {
  //     console.log(error);
  //     setAuthData(undefined);
  //   },
  //   onSuccess: (data) => {
  //     localStorage.setItem('authData', JSON.stringify(data));
  //     setAuthData(data);
  //   },
  // });

  const onSubmit = () => {
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

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

    mutate({ params: { email, password } });
  };

  return (
    <Stack className="w-full h-full bg-blue-50" justifyContent="center">
      <Stack
        className="w-[400px] overflow-hidden bg-white border rounded-lg shadow-md"
        direction="col"
      >
        <p className="w-full py-2 bg-gray-50 text-xl text-center border-b">
          {t('Login.header')}
        </p>
        <Stack className="w-full p-4 gap-4" direction="col">
          <input
            ref={emailRef}
            placeholder={t('Login.email')}
            className={inputStyle}
          />
          <input
            type="password"
            ref={passwordRef}
            placeholder={t('Login.password')}
            className={inputStyle}
          />
          <Button
            className="w-full"
            text={t('Login.submit')}
            onClick={onSubmit}
          />
          <button className="text-blue-500 ml-auto" onClick={toggleMode}>
            {t('Login.noAccount')}
          </button>
        </Stack>
      </Stack>
    </Stack>
  );
};
