// frontend/src/App.jsx
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './routing/AppRouter';

export default function App() {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}