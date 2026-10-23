// frontend/src/pages/InspeccionesPage.jsx
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import InspeccionesTable from '../components/inspeccionesTable';
import InspeccionForm from '../components/inspeccionForm';

export default function InspeccionesPage() {
  const [inspecciones, setInspecciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchInspecciones = () => {
    fetch('http://localhost:5000/api/inspecciones')
      .then((res) => {
        if (!res.ok) throw new Error('Error al conectar con la API de inspecciones');
        return res.json();
      })
      .then((data) => {
        setInspecciones(data.data || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchInspecciones();
  }, []);

  return (
    <div>
      <Navbar />
      <main style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <h2>Control de Inspecciones y Aforo Aduanero</h2>
        <p style={{ color: '#64748b' }}>
          Registro de dictámenes, aforo físico y documental realizado por funcionarios de aduana.
        </p>

        {/* Formulario de registro de inspecciones */}
        <InspeccionForm onInspeccionCreada={fetchInspecciones} />

        {loading && <p>Cargando inspecciones...</p>}
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}
        {!loading && !error && <InspeccionesTable inspecciones={inspecciones} />}
      </main>
    </div>
  );
}