// frontend/src/pages/RetenidosPage.jsx
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import RetenidosTable from '../components/RetenidosTable';

export default function RetenidosPage() {
  const [retenidos, setRetenidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/inventario/retenidos')
      .then((res) => {
        if (!res.ok) throw new Error('Error al conectar con la API');
        return res.json();
      })
      .then((data) => {
        setRetenidos(data.data || []);
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
        <h2>Mercancía Retenida en Bodegas</h2>
        <p style={{ color: '#64748b' }}>
          Inventario bajo custodia preventiva en almacenes y depósitos fiscales.
        </p>

        {loading && <p>Cargando inventario retenido...</p>}
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}
        {!loading && !error && <RetenidosTable retenidos={retenidos} />}
      </main>
    </div>
  );
}