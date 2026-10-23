// frontend/src/pages/RetenidosPage.jsx
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import RetenidosTable from '../components/RetenidosTable';
import RetenidoForm from '../components/retenidoForm';

export default function RetenidosPage() {
  const [retenidos, setRetenidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRetenidos = () => {
    fetch('http://localhost:5000/api/inventario/retenidos')
      .then((res) => {
        if (!res.ok) throw new Error('Error al consultar inventario');
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
  };

  useEffect(() => {
    fetchRetenidos();
  }, []);

  const handleCambiarEstado = async (id_inventario, nuevoEstado) => {
    try {
      const res = await fetch(`http://localhost:5000/api/inventario/retenidos/${id_inventario}/estado`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ estado: nuevoEstado })
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || 'Error al cambiar estado');

      fetchRetenidos();
    } catch (err) {
      alert(`Error al actualizar estado: ${err.message}`);
    }
  };

  return (
    <div>
      <Navbar />
      <main style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <h2>Inventario y Mercancía Retenida en Bodega</h2>
        <p style={{ color: '#64748b' }}>
          Control de mercancías bajo custodia preventiva aduanera y registro de liberaciones de lote.
        </p>

        <RetenidoForm onRetenidoCreado={fetchRetenidos} />

        {loading && <p>Cargando inventario...</p>}
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}
        {!loading && !error && (
          <RetenidosTable 
            retenidos={retenidos} 
            onCambiarEstado={handleCambiarEstado} 
          />
        )}
      </main>
    </div>
  );
}