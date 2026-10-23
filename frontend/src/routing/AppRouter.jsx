import { Routes, Route } from 'react-router-dom';
import DeclaracionesPage from '../pages/DeclaracionesPage';
import RetenidosPage from '../pages/RetenidosPage';
import InspeccionesPage from '../pages/inspeccionesPage';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<DeclaracionesPage />} />
      <Route path="/inspecciones" element={<InspeccionesPage />} />
      <Route path="/retenidos" element={<RetenidosPage />} />
    </Routes>
  );
}