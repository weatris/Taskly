import { Routes, Route } from 'react-router-dom';
import { WorkPlaces } from './WorkPlaces/WorkPlaces';
import { Dashboard } from './Dashboard/Dashboard';
import { Boards } from './BoardsPage/Boards';
import { Board } from './BoardsPage/Board';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/boards" element={<Boards />} />
      <Route path="/boards/:id" element={<Board />} />

      <Route path="/workplaces" element={<WorkPlaces />} />
      <Route path="/workplaces/:id" element={<WorkPlaces />} />
      <Route path="/workplaces/:id/:tab" element={<WorkPlaces />} />
    </Routes>
  );
};
