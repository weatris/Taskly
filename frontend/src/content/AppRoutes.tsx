import { Routes, Route } from 'react-router-dom';
import { Boards } from './BoardsPage/Boards';
import { Board } from './BoardPage/Board';
import { BoardSettings } from './BoardPage/BoardSettings';

export const AppRoutes = () => {
  return (
    <Routes>
      {/* <Route path="/" element={<Dashboard />} /> */}
      <Route path="/" element={<Boards />} />
      <Route path="/boards/:id/:boardName" element={<Board />} />
      <Route
        path="/boards/:id/:boardName/tickets/:ticketId"
        element={<Board />}
      />
      <Route
        path="/boards/:id/:boardName/settings"
        element={<BoardSettings />}
      />

      {/* <Route path="/workplaces" element={<WorkPlaces />} />
      <Route path="/workplaces/:id" element={<WorkPlaces />} />
      <Route path="/workplaces/:id/:tab" element={<WorkPlaces />} /> */}
    </Routes>
  );
};
