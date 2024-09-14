import { useState } from 'react';
import { Login } from './Login';
import { Register } from './Register';

export const UserControl = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleMode = () => {
    setIsLogin(!isLogin);
  };

  return isLogin ? (
    <Login toggleMode={toggleMode} />
  ) : (
    <Register toggleMode={toggleMode} />
  );
};
