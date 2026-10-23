// frontend/src/components/RetenidoForm.jsx
import { useState, useEffect } from 'react';

export default function RetenidoForm({ onRetenidoCreado }) {
  const [formData, setFormData] = useState({
    id_bodega: '',
    descripcion_producto: '',
    cantidad: '',
    valor_unitario: '',
    fecha_ingreso: new Date().toISOString().split('T')[0],
    estado: 'Retenido'
  });

  const [bodegas, setBodegas] = useState([]);
  const [loadingCatalogos, setLoadingCatalogos] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/inventario/catalogos')
      .then((res) => {
        if (!res.ok) throw new Error('Error al cargar bodegas');
        return res.json();
      })
      .then((resData) => {
        const { bodegas: bodegasList } = resData.data;
        setBodegas(bodegasList || []);

        setFormData((prev) => ({
          ...prev,
          id_bodega: bodegasList[0]?.id_bodega || ''
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
      const res = await fetch('http://localhost:5000/api/inventario/retenidos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || 'Error al registrar retención');
      }

      if (onRetenidoCreado) {
        onRetenidoCreado();
      }

      setFormData((prev) => ({
        ...prev,
        descripcion_producto: '',
        cantidad: '',
        valor_unitario: ''
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
      <h3 style={{ marginTop: 0, color: '#0f172a' }}>Ingresar Mercancía a Custodia (Bodega)</h3>

      {error && <p style={{ color: '#dc2626' }}>{error}</p>}

      <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', alignItems: 'end' }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '4px' }}>
            Bodega Aduanera:
          </label>
          <select
            name="id_bodega"
            value={formData.id_bodega}
            onChange={handleChange}
            disabled={loadingCatalogos}
            required
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #94a3b8' }}
          >
            {bodegas.map((b) => (
              <option key={b.id_bodega} value={b.id_bodega}>
                {b.nombre} ({b.ubicacion})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '4px' }}>
            Producto / Carga:
          </label>
          <input
            type="text"
            name="descripcion_producto"
            placeholder="Ej: Lote de microprocesadores"
            value={formData.descripcion_producto}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #94a3b8' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '4px' }}>
            Cantidad:
          </label>
          <input
            type="number"
            name="cantidad"
            placeholder="Ej: 50"
            value={formData.cantidad}
            onChange={handleChange}
            min="1"
            required
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #94a3b8' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '4px' }}>
            Valor Unitario ($):
          </label>
          <input
            type="number"
            name="valor_unitario"
            placeholder="Ej: 125.50"
            value={formData.valor_unitario}
            onChange={handleChange}
            step="0.01"
            min="0"
            required
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #94a3b8' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '4px' }}>
            Fecha de Ingreso:
          </label>
          <input
            type="date"
            name="fecha_ingreso"
            value={formData.fecha_ingreso}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #94a3b8' }}
          />
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
            {loading ? 'Guardando...' : 'Registrar Ingreso'}
          </button>
        </div>
      </form>
    </div>
  );
}