// frontend/src/components/DeclaracionForm.jsx
import { useState, useEffect } from 'react';

export default function DeclaracionForm({ onDeclaracionCreada }) {
  const [formData, setFormData] = useState({
    numero_dua: '',
    fecha: new Date().toISOString().split('T')[0],
    regimen: 'Importacion',
    estado: 'Retenida',
    id_importador: '',
    id_agente: 1,
    id_pais_origen: ''
  });

  const [catalogos, setCatalogos] = useState({ importadores: [], paises: [] });
  const [loadingCatalogos, setLoadingCatalogos] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Cargar importadores y países desde la API
  useEffect(() => {
    fetch('http://localhost:5000/api/catalogos')
      .then((res) => {
        if (!res.ok) throw new Error('Error al cargar catálogos');
        return res.json();
      })
      .then((resData) => {
        const { importadores, paises } = resData.data;
        setCatalogos({ importadores, paises });
        // Fijar el primer elemento disponible por defecto
        setFormData((prev) => ({
          ...prev,
          id_importador: importadores[0]?.id_importador || '',
          id_pais_origen: paises[0]?.id_pais || ''
        }));
        setLoadingCatalogos(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoadingCatalogos(false);
      });
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('http://localhost:5000/api/declaraciones', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || 'Error al guardar la declaración');
      }

      if (onDeclaracionCreada) {
        onDeclaracionCreada();
      }

      setFormData((prev) => ({
        ...prev,
        numero_dua: ''
      }));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      backgroundColor: '#f8fafc',
      padding: '1.5rem',
      borderRadius: '8px',
      border: '1px solid #cbd5e1',
      marginBottom: '2rem'
    }}>
      <h3 style={{ marginTop: 0, color: '#0f172a' }}>Registrar Nueva Declaración (DUA)</h3>

      {error && <p style={{ color: '#dc2626' }}>{error}</p>}

      <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', alignItems: 'end' }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '4px' }}>
            Número de DUA:
          </label>
          <input
            type="text"
            name="numero_dua"
            placeholder="Ej: DUA-2026-0004"
            value={formData.numero_dua}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #94a3b8' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '4px' }}>
            Fecha:
          </label>
          <input
            type="date"
            name="fecha"
            value={formData.fecha}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #94a3b8' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '4px' }}>
            Importador:
          </label>
          <select
            name="id_importador"
            value={formData.id_importador}
            onChange={handleChange}
            disabled={loadingCatalogos}
            required
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #94a3b8' }}
          >
            {catalogos.importadores.map((imp) => (
              <option key={imp.id_importador} value={imp.id_importador}>
                {imp.nombre_razon_social}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '4px' }}>
            País de Origen:
          </label>
          <select
            name="id_pais_origen"
            value={formData.id_pais_origen}
            onChange={handleChange}
            disabled={loadingCatalogos}
            required
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #94a3b8' }}
          >
            {catalogos.paises.map((p) => (
              <option key={p.id_pais} value={p.id_pais}>
                {p.nombre} ({p.codigo_iso})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '4px' }}>
            Régimen:
          </label>
          <select
            name="regimen"
            value={formData.regimen}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #94a3b8' }}
          >
            <option value="Importacion">Importación</option>
            <option value="Exportacion">Exportación</option>
            <option value="Transito">Tránsito</option>
          </select>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '4px' }}>
            Estado Inicial:
          </label>
          <select
            name="estado"
            value={formData.estado}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #94a3b8' }}
          >
            <option value="Retenida">Retenida</option>
            <option value="Liberada">Liberada</option>
          </select>
        </div>

        <div>
          <button
            type="submit"
            disabled={loading || loadingCatalogos}
            style={{
              width: '100%',
              padding: '9px 16px',
              backgroundColor: '#0284c7',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontWeight: 600,
              cursor: loading || loadingCatalogos ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? 'Guardando...' : 'Registrar DUA'}
          </button>
        </div>
      </form>
    </div>
  );
}