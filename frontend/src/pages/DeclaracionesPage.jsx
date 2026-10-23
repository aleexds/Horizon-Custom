// frontend/src/pages/DeclaracionesPage.jsx
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import DeclaracionesTable from '../components/DeclaracionesTable';

export default function DeclaracionesPage() {
  const [declaraciones, setDeclaraciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/declaraciones')
      .then((res) => {
        if (!res.ok) throw new Error('Error al conectar con la API');
        return res.json();
      })
      .then((data) => {
        setDeclaraciones(data.data || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <Navbar />
      <main style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <h2>Control de Declaraciones Aduaneras (DUA)</h2>
        <p style={{ color: '#64748b' }}>
          Listado general de trámites aduaneros registrados en Horizon Aduanas.
        </p>

        {loading && <p>Cargando declaraciones...</p>}
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}
        {!loading && !error && <DeclaracionesTable declaraciones={declaraciones} />}
      </main>
    </div>
  );
}