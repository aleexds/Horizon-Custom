// frontend/src/pages/DeclaracionesPage.jsx
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import DeclaracionesTable from '../components/DeclaracionesTable';
import DeclaracionForm from '../components/DeclaracionForm';

export default function DeclaracionesPage() {
  const [declaraciones, setDeclaraciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDeclaraciones = () => {
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
  };

  useEffect(() => {
    fetchDeclaraciones();
  }, []);

  const handleCambiarEstado = async (id_declaracion, nuevoEstado) => {
    try {
      const res = await fetch(`http://localhost:5000/api/declaraciones/${id_declaracion}/estado`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ estado: nuevoEstado })
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || 'Error al cambiar estado');

      // Actualizar listado
      fetchDeclaraciones();
    } catch (err) {
      alert(`Error al actualizar estado: ${err.message}`);
    }
  };

  return (
    <div>
      <Navbar />
      <main style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <h2>Control de Declaraciones Aduaneras (DUA)</h2>
        <p style={{ color: '#64748b' }}>Gestión y registro de trámites aduaneros en Horizon Aduanas.</p>

        {/* Formulario para registrar DUA */}
        <DeclaracionForm onDeclaracionCreada={fetchDeclaraciones} />

        {loading && <p>Cargando declaraciones...</p>}
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}
        {!loading && !error && (
          <DeclaracionesTable 
            declaraciones={declaraciones} 
            onCambiarEstado={handleCambiarEstado} 
          />
        )}
      </main>
    </div>
  );
}