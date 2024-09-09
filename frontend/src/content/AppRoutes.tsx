import { Routes, Route } from 'react-router-dom';
import { WorkPlaces } from './WorkPlaces/WorkPlaces';
import { WorkPlace } from './WorkPlaces/WorkPlace';
import { Dashboard } from './Dashboard/Dashboard';
import { Boards } from './BoardsPage/Boards';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/boards" element={<Boards />} />

      <Route path="/workplaces" element={<WorkPlaces />} />
      <Route path="/workplaces/:id" element={<WorkPlaces />} />
      <Route path="/workplaces/:id/:tab" element={<WorkPlaces />} />
    </Routes>
  );
};
