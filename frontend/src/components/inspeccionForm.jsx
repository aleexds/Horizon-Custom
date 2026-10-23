// frontend/src/components/InspeccionForm.jsx
import { useState, useEffect } from 'react';

export default function InspeccionForm({ onInspeccionCreada }) {
  const [formData, setFormData] = useState({
    id_declaracion: '',
    id_funcionario: '',
    fecha: new Date().toISOString().split('T')[0],
    resultado: 'Conforme',
    observaciones: ''
  });

  const [declaraciones, setDeclaraciones] = useState([]);
  const [funcionarios, setFuncionarios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingCatalogos, setLoadingCatalogos] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([
      fetch('http://localhost:5000/api/declaraciones').then((res) => res.json()),
      fetch('http://localhost:5000/api/funcionarios').then((res) => res.json())
    ])
      .then(([resDec, resFunc]) => {
        const decList = resDec.data || [];
        const funcList = resFunc.data || [];

        setDeclaraciones(decList);
        setFuncionarios(funcList);

        setFormData((prev) => ({
          ...prev,
          id_declaracion: decList[0]?.id_declaracion || '',
          id_funcionario: funcList[0]?.id_funcionario || ''
        }));
        setLoadingCatalogos(false);
      })
      .catch((err) => {
        setError('Error al cargar datos del formulario: ' + err.message);
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
      const res = await fetch('http://localhost:5000/api/inspecciones', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || 'Error al guardar la inspección');
      }

      if (onInspeccionCreada) {
        onInspeccionCreada();
      }

      setFormData((prev) => ({
        ...prev,
        observaciones: ''
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
      <h3 style={{ marginTop: 0, color: '#0f172a' }}>Registrar Inspección Aduanera</h3>

      {error && <p style={{ color: '#dc2626' }}>{error}</p>}

      <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', alignItems: 'end' }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '4px' }}>
            Declaración (DUA):
          </label>
          <select
            name="id_declaracion"
            value={formData.id_declaracion}
            onChange={handleChange}
            disabled={loadingCatalogos}
            required
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #94a3b8' }}
          >
            {declaraciones.map((d) => (
              <option key={d.id_declaracion} value={d.id_declaracion}>
                {d.numero_dua} ({d.regimen})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '4px' }}>
            Funcionario / Inspector:
          </label>
          <select
            name="id_funcionario"
            value={formData.id_funcionario}
            onChange={handleChange}
            disabled={loadingCatalogos}
            required
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #94a3b8' }}
          >
            {funcionarios.map((f) => (
              <option key={f.id_funcionario} value={f.id_funcionario}>
                {f.nombre} - {f.cargo}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '4px' }}>
            Fecha de Inspección:
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
            Resultado:
          </label>
          <select
            name="resultado"
            value={formData.resultado}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #94a3b8' }}
          >
            <option value="Conforme">Conforme</option>
            <option value="Con observaciones">Con observaciones</option>
            <option value="No Conforme">No Conforme</option>
          </select>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '4px' }}>
            Observaciones:
          </label>
          <input
            type="text"
            name="observaciones"
            placeholder="Detalles del aforo"
            value={formData.observaciones}
            onChange={handleChange}
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
            {loading ? 'Guardando...' : 'Registrar Inspección'}
          </button>
        </div>
      </form>
    </div>
  );
}