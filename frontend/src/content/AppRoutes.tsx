import { Routes, Route } from 'react-router-dom';
import { Boards } from './BoardsPage/Boards';
import { Board } from './BoardPage/Board';
import { BoardSettings } from './BoardSettings/BoardSettings';
import { BoardShare } from './SpecialPages/BoardShare';
import { UserPage } from './UserControl/UserPage';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Boards />} />
      <Route path="/boards/:id" element={<Board />} />
      <Route path="/boards/:id/:boardName" element={<Board />} />
      <Route
        path="/boards/:id/:boardName/tickets/:ticketId"
        element={<Board />}
      />
      <Route
        path="/boards/:id/:boardName/settings"
        element={<BoardSettings />}
      />
      <Route path="/board_share/:id/:token" element={<BoardShare />} />
      <Route path="/user" element={<UserPage />} />
    </Routes>
  );
};
