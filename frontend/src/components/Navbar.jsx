// frontend/src/components/Navbar.jsx
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <header style={{
      backgroundColor: '#0f172a',
      color: '#f8fafc',
      padding: '1rem 2rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottom: '2px solid #334155'
    }}>
      <div>
        <h1 style={{ margin: 0, fontSize: '1.4rem', letterSpacing: '0.5px' }}>
          Horizon Aduanas
        </h1>
        <small style={{ color: '#94a3b8' }}>Sistema de Gestión y Control Aduanero</small>
      </div>

      <nav style={{ display: 'flex', gap: '1.2rem' }}>
        <Link to="/" style={{ color: '#38bdf8', textDecoration: 'none', fontWeight: 500 }}>
          Declaraciones (DUA)
        </Link>
        <Link to="/retenidos" style={{ color: '#38bdf8', textDecoration: 'none', fontWeight: 500 }}>
          Mercancía Retenida
        </Link>
      </nav>
    </header>
  );
}