import { t } from 'i18next';
import { Button } from '../../components/Button';
import { Stack } from '../../components/Stack/Stack';
import { useNotification } from '../../stateProvider/notification/useNotification';
import { useRef } from 'react';
import { useApiMutation } from '../../api/useApiMutation';
import { inputStyle } from '../../common/styles';
import { useNavigate } from 'react-router-dom';

export const Login = ({ toggleMode }: { toggleMode: () => void }) => {
  const { addNotification } = useNotification();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const { mutate } = useApiMutation('login', {
    onSuccess: (data) => {
      localStorage.setItem('authData', JSON.stringify(data));
      window.location.reload();
    },
    onError: () => {
      addNotification({ title: t('Errors.invalidData') });
    },
  });

  const onSubmit = () => {
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

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
        title: t('Errors.passwordNotSafe'),
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
            text={t('common.submit')}
            onClick={onSubmit}
          />
          <Stack
            className="w-full px-2"
            direction="row"
            alignItems="center"
            justifyContent="between"
          >
            <button
              className="text-red-700"
              onClick={() => {
                navigate('/recover');
              }}
            >
              {t('Login.forgotPassword')}
            </button>
            <button className="text-blue-500" onClick={toggleMode}>
              {t('Login.noAccount')}
            </button>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};
