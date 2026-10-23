// frontend/src/components/Navbar.jsx
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <header style={{
      backgroundColor: '#0a192f',
      padding: '1rem 2rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      color: 'white',
      borderBottom: '3px solid #0284c7'
    }}>
      <div>
        <h1 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 700 }}>Horizon Aduanas</h1>
        <small style={{ color: '#94a3b8', fontSize: '0.75rem' }}>Sistema de Gestión y Control Aduanero</small>
      </div>

      <nav style={{ display: 'flex', gap: '1.5rem' }}>
        <Link to="/" style={{ color: '#38bdf8', textDecoration: 'none', fontWeight: 600 }}>
          Declaraciones (DUA)
        </Link>
        <Link to="/inspecciones" style={{ color: '#38bdf8', textDecoration: 'none', fontWeight: 600 }}>
          Inspecciones
        </Link>
        <Link to="/retenidos" style={{ color: '#38bdf8', textDecoration: 'none', fontWeight: 600 }}>
          Mercancía Retenida
        </Link>
      </nav>
    </header>
  );
}