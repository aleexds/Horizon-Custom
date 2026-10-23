// frontend/src/routing/AppRouter.jsx
import { Routes, Route } from 'react-router-dom';
import DeclaracionesPage from '../pages/DeclaracionesPage';
import RetenidosPage from '../pages/RetenidosPage';

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<DeclaracionesPage />} />
      <Route path="/retenidos" element={<RetenidosPage />} />
    </Routes>
  );
}