import { Routes, Route } from 'react-router-dom';
import { Boards } from './BoardsPage/Boards';
import { Board } from './BoardPage/Board';
import { BoardSettings } from './BoardSettings/BoardSettings';
import { BoardShare } from './SpecialPages/BoardShare';
import { UserPage } from './UserControl/UserPage';
import { useStateProvider } from '../stateProvider/useStateProvider';
import { useEffect } from 'react';
import { useScreenDetector } from '../utils/useScreenDetector';

export const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Boards />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="boards/*" element={<BoardRoutes />} />
      </Routes>
    </>
  );
};

const BoardRoutes = () => {
  const { actions } = useStateProvider();
  const { toggleNavbar } = actions;
  const { isSmallTablet } = useScreenDetector();

  useEffect(() => {
    toggleNavbar(!isSmallTablet);

    return () => {
      toggleNavbar(true);
    };
  }, [isSmallTablet]);

  return (
    <Routes>
      <Route path=":id" element={<Board />} />
      <Route path=":id/:boardName" element={<Board />} />
      <Route path=":id/:boardName/tickets/:ticketId" element={<Board />} />
      <Route path=":id/:boardName/settings" element={<BoardSettings />} />
      <Route path="share/:id/:token" element={<BoardShare />} />
    </Routes>
  );
};
